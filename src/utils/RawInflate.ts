enum BufferType {
    BLOCK,
    ADAPTIVE
};

interface IParams {
    index: number;
    bufferSize: number;
    bufferType: number;
    resize: boolean;
}

/** @define {number} buffer block size. */
const ZLIB_RAW_INFLATE_BUFFER_SIZE: number = 0x8000; // [ 0x8000 >= ZLIB_BUFFER_BLOCK_SIZE ]
const MaxBackwardLength = 32768;
const MaxCopyLength = 258;
const Order = new Uint16Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);

const LengthCodeTable = new Uint16Array([
    0x0003, 0x0004, 0x0005, 0x0006, 0x0007, 0x0008, 0x0009, 0x000a, 0x000b,
    0x000d, 0x000f, 0x0011, 0x0013, 0x0017, 0x001b, 0x001f, 0x0023, 0x002b,
    0x0033, 0x003b, 0x0043, 0x0053, 0x0063, 0x0073, 0x0083, 0x00a3, 0x00c3,
    0x00e3, 0x0102, 0x0102, 0x0102
]);

const LengthExtraTable = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5,
    5, 5, 0, 0, 0
  ])

const DistCodeTable = new Uint16Array([
    0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d, 0x0011,
    0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1, 0x0101, 0x0181,
    0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01, 0x1001, 0x1801, 0x2001,
    0x3001, 0x4001, 0x6001
])

const DistExtraTable = new Uint8Array([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11,
    11, 12, 12, 13, 13
])

const buildHuffmanTable = (lengths: Uint8Array) => {
    /** @type {number} length list size. */
    var listSize = lengths.length;
    /** @type {number} max code length for table size. */
    var maxCodeLength = 0;
    /** @type {number} min code length for table size. */
    var minCodeLength = Number.POSITIVE_INFINITY;
    /** @type {number} table size. */
    var size;
    /** @type {!(Array|Uint8Array)} huffman code table. */
    var table;
    /** @type {number} bit length. */
    var bitLength;
    /** @type {number} huffman code. */
    var code;
    /**
     * サイズが 2^maxlength 個のテーブルを埋めるためのスキップ長.
     * @type {number} skip length for table filling.
     */
    var skip;
    /** @type {number} reversed code. */
    var reversed;
    /** @type {number} reverse temp. */
    var rtemp;
    /** @type {number} loop counter. */
    var i;
    /** @type {number} loop limit. */
    var il;
    /** @type {number} loop counter. */
    var j;
    /** @type {number} table value. */
    var value;

    // Math.max は遅いので最長の値は for-loop で取得する
    for (i = 0, il = listSize; i < il; ++i) {
        if (lengths[i] > maxCodeLength) {
            maxCodeLength = lengths[i];
        }
        if (lengths[i] < minCodeLength) {
            minCodeLength = lengths[i];
        }
    }

    size = 1 << maxCodeLength;
    table = new Uint32Array(size);

    // ビット長の短い順からハフマン符号を割り当てる
    for (bitLength = 1, code = 0, skip = 2; bitLength <= maxCodeLength;) {
        for (i = 0; i < listSize; ++i) {
            if (lengths[i] === bitLength) {
                // ビットオーダーが逆になるためビット長分並びを反転する
                for (reversed = 0, rtemp = code, j = 0; j < bitLength; ++j) {
                    reversed = (reversed << 1) | (rtemp & 1);
                    rtemp >>= 1;
                }

                // 最大ビット長をもとにテーブルを作るため、
                // 最大ビット長以外では 0 / 1 どちらでも良い箇所ができる
                // そのどちらでも良い場所は同じ値で埋めることで
                // 本来のビット長以上のビット数取得しても問題が起こらないようにする
                value = (bitLength << 16) | i;
                for (j = reversed; j < size; j += skip) {
                    table[j] = value;
                }

                ++code;
            }
        }

        // 次のビット長へ
        ++bitLength;
        code <<= 1;
        skip <<= 1;
    }

    return [table, maxCodeLength, minCodeLength];

}

const FixedLiteralLengthTable = (() => {
    let lengths = new Uint8Array(288);
    for (let i = 0, il = lengths.length; i < il; ++i) {
        lengths[i] =
            (i <= 143) ? 8 :
                (i <= 255) ? 9 :
                    (i <= 279) ? 7 :
                        8;
    }

    return buildHuffmanTable(lengths)[0];
})();

const FixedDistanceTable = (() => {
    let lengths = new Uint8Array(30);

    for (let i = 0, il = lengths.length; i < il; ++i) {
        lengths[i] = 5;
    }
    return buildHuffmanTable(lengths);
})();



export class RawInflate {
    buffer: Uint8Array;//inflated buffer
    blocks: Uint8Array[];
    bufferSize: number;
    totalpos: number;
    ip: number;
    bitsbuf: number;
    bitsbuflen: number;
    input: Uint8Array;
    output: Uint8Array;
    op: number;
    bfinal: boolean;
    bufferType: BufferType;
    resize: boolean;
    currentLitlenTable: Uint16Array;
    constructor(input: ArrayBuffer, opt_params?: IParams) {
        this.blocks = [];
        this.bufferSize = ZLIB_RAW_INFLATE_BUFFER_SIZE;
        this.totalpos = 0;
        this.ip = 0;
        this.bitsbuf = 0;
        this.bitsbuflen = 0;
        this.input = new Uint8Array(input);

        this.bfinal = false;
        this.bufferType = BufferType.ADAPTIVE;
        this.resize = false;

        // option parameters
        if (opt_params) {
            if (opt_params['index']) {
                this.ip = opt_params['index'];
            }
            if (opt_params['bufferSize']) {
                this.bufferSize = opt_params['bufferSize'];
            }
            if (opt_params['bufferType']) {
                this.bufferType = opt_params['bufferType'];
            }
            if (opt_params['resize']) {
                this.resize = opt_params['resize'];
            }
        }

        // initialize
        switch (this.bufferType) {
            case BufferType.BLOCK:
                this.op = MaxBackwardLength;
                this.output = new Uint8Array(MaxBackwardLength + this.bufferSize + MaxCopyLength);
                break;
            case BufferType.ADAPTIVE:
                this.op = 0;
                this.output = new Uint8Array(this.bufferSize);
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }
    decompress() {
        while (!this.bfinal) {
            this.parseBlock();
        }

        switch (this.bufferType) {
            case BufferType.BLOCK:
                return this.concatBufferBlock();
            case BufferType.ADAPTIVE:
                return this.concatBufferDynamic();
            default:
                throw new Error('invalid inflate mode');
        }
    }

    parseBlock() {
        let hdr = this.readBits(3);
        if (hdr & 0x1) {
            this.bfinal = true;
        }

        hdr >>>= 1;
        switch (hdr) {
            // uncompressed
            case 0:
                this.parseUncompressedBlock();
                break;
            // fixed huffman
            case 1:
                this.parseFixedHuffmanBlock();
                break;
            // dynamic huffman
            case 2:
                this.parseDynamicHuffmanBlock();
                break;
            // reserved or other
            default:
                throw new Error('unknown BTYPE: ' + hdr);
        }
    };

    readBits(length: number) {
        let bitsbuf = this.bitsbuf;
        let bitsbuflen = this.bitsbuflen;
        let input = this.input;
        let ip = this.ip;

        let inputLength = input.length;

        let octet;
        if (ip + ((length - bitsbuflen + 7) >> 3) >= inputLength) {
            throw new Error('input buffer is broken');
        }

        // not enough buffer
        while (bitsbuflen < length) {
            bitsbuf |= input[ip++] << bitsbuflen;
            bitsbuflen += 8;
        }

        // output byte
        octet = bitsbuf & /* MASK */ ((1 << length) - 1);
        bitsbuf >>>= length;
        bitsbuflen -= length;

        this.bitsbuf = bitsbuf;
        this.bitsbuflen = bitsbuflen;
        this.ip = ip;

        return octet;
    };


    readCodeByTable(table: Array<number> | Uint8Array | Uint16Array) {
        let bitsbuf = this.bitsbuf;
        let bitsbuflen = this.bitsbuflen;
        let input = this.input;
        let ip = this.ip;

        /** @type {number} */
        let inputLength = input.length;
        /** @type {!(Array.<number>|Uint8Array)} huffman code table */
        let codeTable = table[0];
        /** @type {number} */
        let maxCodeLength = table[1];
        /** @type {number} code length & code (16bit, 16bit) */
        let codeWithLength;
        /** @type {number} code bits length */
        let codeLength;

        // not enough buffer
        while (bitsbuflen < maxCodeLength) {
            if (ip >= inputLength) {
                break;
            }
            bitsbuf |= input[ip++] << bitsbuflen;
            bitsbuflen += 8;
        }

        // read max length
        codeWithLength = codeTable[bitsbuf & ((1 << maxCodeLength) - 1)];
        codeLength = codeWithLength >>> 16;

        if (codeLength > bitsbuflen) {
            throw new Error('invalid code length: ' + codeLength);
        }

        this.bitsbuf = bitsbuf >> codeLength;
        this.bitsbuflen = bitsbuflen - codeLength;
        this.ip = ip;

        return codeWithLength & 0xffff;
    };


    parseUncompressedBlock() {
        let input = this.input;
        let ip = this.ip;
        let output = this.output;
        let op = this.op;

        /** @type {number} */
        let inputLength = input.length;
        /** @type {number} block length */
        let len;
        /** @type {number} number for check block length */
        let nlen;
        /** @type {number} output buffer length */
        let olength = output.length;
        /** @type {number} copy counter */
        let preCopy;

        // skip buffered header bits
        this.bitsbuf = 0;
        this.bitsbuflen = 0;

        // len
        if (ip + 1 >= inputLength) {
            throw new Error('invalid uncompressed block header: LEN');
        }
        len = input[ip++] | (input[ip++] << 8);

        // nlen
        if (ip + 1 >= inputLength) {
            throw new Error('invalid uncompressed block header: NLEN');
        }
        nlen = input[ip++] | (input[ip++] << 8);

        // check len & nlen
        if (len === ~nlen) {
            throw new Error('invalid uncompressed block header: length verify');
        }

        // check size
        if (ip + len > input.length) { throw new Error('input buffer is broken'); }

        // expand buffer
        switch (this.bufferType) {
            case BufferType.BLOCK:
                // pre copy
                while (op + len > output.length) {
                    preCopy = olength - op;
                    len -= preCopy;

                    (output as Uint8Array).set((input as Uint8Array).subarray(ip, ip + preCopy), op);
                    op += preCopy;
                    ip += preCopy;

                    this.op = op;
                    output = this.expandBufferBlock();
                    op = this.op;
                }
                break;
            case BufferType.ADAPTIVE:
                while (op + len > output.length) {
                    output = this.expandBufferAdaptive({ fixRatio: 2 });
                }
                break;
            default:
                throw new Error('invalid inflate mode');
        }

        // copy

        output.set(input.subarray(ip, ip + len), op);
        op += len;
        ip += len;


        this.ip = ip;
        this.op = op;
        this.output = output;
    };


    parseFixedHuffmanBlock() {
        switch (this.bufferType) {
            case BufferType.ADAPTIVE:
                this.decodeHuffmanAdaptive(
                    FixedLiteralLengthTable,
                    FixedDistanceTable
                );
                break;
            case BufferType.BLOCK:
                this.decodeHuffmanBlock(
                    FixedLiteralLengthTable,
                    FixedDistanceTable
                );
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }


    parseDynamicHuffmanBlock() {
        /** @type {number} number of literal and length codes. */
        let hlit = this.readBits(5) + 257;
        /** @type {number} number of distance codes. */
        let hdist = this.readBits(5) + 1;
        /** @type {number} number of code lengths. */
        let hclen = this.readBits(4) + 4;
        /** @type {!(Uint8Array|Array.<number>)} code lengths. */
        let codeLengths =
            new Uint8Array(Order.length);
        /** @type {!Array} code lengths table. */
        let codeLengthsTable;
        /** @type {!(Uint8Array|Array.<number>)} literal and length code table. */
        let litlenTable;
        /** @type {!(Uint8Array|Array.<number>)} distance code table. */
        let distTable;

        /** @type {number} */
        let code;
        /** @type {number} */
        let prev;
        /** @type {number} */
        let repeat;
        /** @type {number} loop counter. */
        let i;
        /** @type {number} loop limit. */
        let il;

        // decode code lengths
        for (i = 0; i < hclen; ++i) {
            codeLengths[Order[i]] = this.readBits(3);
        }

        // decode length table
        codeLengthsTable = buildHuffmanTable(codeLengths);
        let lengthTable: Uint8Array = new Uint8Array(hlit + hdist);
        for (i = 0, il = hlit + hdist; i < il;) {
            code = this.readCodeByTable(codeLengthsTable);
            switch (code) {
                case 16:
                    repeat = 3 + this.readBits(2);
                    while (repeat--) { lengthTable[i++] = prev; }
                    break;
                case 17:
                    repeat = 3 + this.readBits(3);
                    while (repeat--) { lengthTable[i++] = 0; }
                    prev = 0;
                    break;
                case 18:
                    repeat = 11 + this.readBits(7);
                    while (repeat--) { lengthTable[i++] = 0; }
                    prev = 0;
                    break;
                default:
                    lengthTable[i++] = code;
                    prev = code;
                    break;
            }
        }

        litlenTable = buildHuffmanTable(lengthTable.subarray(0, hlit));
        distTable = buildHuffmanTable(lengthTable.subarray(hlit))

        switch (this.bufferType) {
            case BufferType.ADAPTIVE:
                this.decodeHuffmanAdaptive(litlenTable, distTable);
                break;
            case BufferType.BLOCK:
                this.decodeHuffmanBlock(litlenTable, distTable);
                break;
            default:
                throw new Error('invalid inflate mode');
        }
    }

    decodeHuffmanBlock(litlen: Uint16Array, dist: Array<number> | Uint8Array | Uint16Array) {
        let output = this.output;
        let op = this.op;

        this.currentLitlenTable = litlen;

        /** @type {number} output position limit. */
        let olength = output.length - MaxCopyLength;
        /** @type {number} huffman code. */
        let code;
        /** @type {number} table index. */
        let ti;
        /** @type {number} huffman code distination. */
        let codeDist;
        /** @type {number} huffman code length. */
        let codeLength;

        let lengthCodeTable = LengthCodeTable;
        let lengthExtraTable = LengthExtraTable;
        let distCodeTable = DistCodeTable;
        let distExtraTable = DistExtraTable;

        while ((code = this.readCodeByTable(litlen)) !== 256) {
            // literal
            if (code < 256) {
                if (op >= olength) {
                    this.op = op;
                    output = this.expandBufferBlock();
                    op = this.op;
                }
                output[op++] = code;

                continue;
            }

            // length code
            ti = code - 257;
            codeLength = lengthCodeTable[ti];
            if (lengthExtraTable[ti] > 0) {
                codeLength += this.readBits(lengthExtraTable[ti]);
            }

            // dist code
            code = this.readCodeByTable(dist);
            codeDist = distCodeTable[code];
            if (distExtraTable[code] > 0) {
                codeDist += this.readBits(distExtraTable[code]);
            }

            // lz77 decode
            if (op >= olength) {
                this.op = op;
                output = this.expandBufferBlock();
                op = this.op;
            }
            while (codeLength--) {
                output[op] = output[(op++) - codeDist];
            }
        }

        while (this.bitsbuflen >= 8) {
            this.bitsbuflen -= 8;
            this.ip--;
        }
        this.op = op;
    };

    decodeHuffmanAdaptive(litlen: Uint16Array, dist: Array<number> | Uint8Array | Uint16Array) {
        let output = this.output;
        let op = this.op;

        this.currentLitlenTable = litlen;

        /** @type {number} output position limit. */
        let olength = output.length;
        /** @type {number} huffman code. */
        let code;
        /** @type {number} table index. */
        let ti;
        /** @type {number} huffman code distination. */
        let codeDist;
        /** @type {number} huffman code length. */
        let codeLength;

        let lengthCodeTable = LengthCodeTable;
        let lengthExtraTable = LengthExtraTable;
        let distCodeTable = DistCodeTable;
        let distExtraTable = DistExtraTable;

        while ((code = this.readCodeByTable(litlen)) !== 256) {
            // literal
            if (code < 256) {
                if (op >= olength) {
                    output = this.expandBufferAdaptive();
                    olength = output.length;
                }
                output[op++] = code;

                continue;
            }

            // length code
            ti = code - 257;
            codeLength = lengthCodeTable[ti];
            if (lengthExtraTable[ti] > 0) {
                codeLength += this.readBits(lengthExtraTable[ti]);
            }

            // dist code
            code = this.readCodeByTable(dist);
            codeDist = distCodeTable[code];
            if (distExtraTable[code] > 0) {
                codeDist += this.readBits(distExtraTable[code]);
            }

            // lz77 decode
            if (op + codeLength > olength) {
                output = this.expandBufferAdaptive();
                olength = output.length;
            }
            while (codeLength--) {
                output[op] = output[(op++) - codeDist];
            }
        }

        while (this.bitsbuflen >= 8) {
            this.bitsbuflen -= 8;
            this.ip--;
        }
        this.op = op;
    }


    expandBufferBlock() {
        let buffer = new Uint8Array(this.op - MaxBackwardLength);
        let backward = this.op - MaxBackwardLength;

        let output = this.output;

        // copy to output buffer
        buffer.set(output.subarray(MaxBackwardLength, buffer.length));


        this.blocks.push(buffer);
        this.totalpos += buffer.length;

        // copy to backward buffer

        output.set(
            output.subarray(backward, backward + MaxBackwardLength)
        );


        this.op = MaxBackwardLength;

        return output;
    }


    expandBufferAdaptive(opt_param?: { [key: string]: number }) {
        /** @type {!(Array.<number>|Uint8Array)} store buffer. */
        let buffer;
        /** @type {number} expantion ratio. */
        let ratio = (this.input.length / this.ip + 1) | 0;
        /** @type {number} maximum number of huffman code. */
        let maxHuffCode;
        /** @type {number} new output buffer size. */
        let newSize;
        /** @type {number} max inflate size. */
        let maxInflateSize;

        let input = this.input;
        let output = this.output;

        if (opt_param) {
            if (typeof opt_param.fixRatio === 'number') {
                ratio = opt_param.fixRatio;
            }
            if (typeof opt_param.addRatio === 'number') {
                ratio += opt_param.addRatio;
            }
        }

        // calculate new buffer size
        if (ratio < 2) {
            maxHuffCode =
                (input.length - this.ip) / this.currentLitlenTable[2];
            maxInflateSize = (maxHuffCode / 2 * 258) | 0;
            newSize = maxInflateSize < output.length ?
                output.length + maxInflateSize :
                output.length << 1;
        } else {
            newSize = output.length * ratio;
        }


        buffer = new Uint8Array(newSize);
        buffer.set(output);


        this.output = buffer;

        return this.output;
    };


    concatBufferBlock() {
        /** @type {number} buffer pointer. */
        let pos = 0;
        /** @type {number} buffer pointer. */
        let limit = this.totalpos + (this.op - MaxBackwardLength);
        /** @type {!(Array.<number>|Uint8Array)} output block array. */
        let output = this.output;
        /** @type {!Array} blocks array. */
        let blocks = this.blocks;
        /** @type {!(Array.<number>|Uint8Array)} output block array. */
        let block;
        /** @type {!(Array.<number>|Uint8Array)} output buffer. */
        let buffer = new Uint8Array(limit);
        /** @type {number} loop counter. */
        let i;
        /** @type {number} loop limiter. */
        let il;
        /** @type {number} loop counter. */
        let j;
        /** @type {number} loop limiter. */
        let jl;

        // single buffer
        if (blocks.length === 0) {
            return this.output.subarray(MaxBackwardLength, this.op)
        }

        // copy to buffer
        for (i = 0, il = blocks.length; i < il; ++i) {
            block = blocks[i];
            for (j = 0, jl = block.length; j < jl; ++j) {
                buffer[pos++] = block[j];
            }
        }

        // current buffer
        for (i = MaxBackwardLength, il = this.op; i < il; ++i) {
            buffer[pos++] = output[i];
        }

        this.blocks = [];
        this.buffer = buffer;

        return this.buffer;
    };

    concatBufferDynamic() {
        let buffer: Uint8Array;
        let op = this.op;


        if (this.resize) {
            buffer = new Uint8Array(op);
            buffer.set(this.output.subarray(0, op));
        } else {
            buffer = this.output.subarray(0, op);
        }


        this.buffer = buffer;

        return this.buffer;
    }


}