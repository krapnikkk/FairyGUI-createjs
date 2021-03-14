import { UIPackage } from '../res/UIPackage'
import { Recycler } from './Recycler'

export class GObjectRecycler extends Recycler<any> {
  public constructor() {
    super()
  }

  public clear(): void {
    for (let key in this.$pool) {
      let arr = this.$pool[key]
      if (arr) {
        arr.forEach((v: any) => {
          v.dispose()
        })
      }
    }
    super.clear()
  }

  protected createObject(id: string): any {
    return UIPackage.createObjectFromURL(id) //id = url
  }
}
