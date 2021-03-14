import { GObject } from './GObject'
import { PackageItem } from './res/PackageItem'

export interface IGRoot {
  [x: string]: any
  inst: any
  findFor(obj: GObject): any
}
export interface IObjectFactoryType {
  newObjectDirectly(type: string): GObject
  newObject(type: number | PackageItem, userClass?: new () => GObject): GObject
}
