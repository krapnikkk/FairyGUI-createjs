import { PackageItemType } from '../config/Definitions'
import { GButton } from '../GButton'
import { GComboBox } from '../GComboBox'
import { GComponent } from '../GComponent'
import { GGraph } from '../GGraph'
import { GGroup } from '../GGroup'
import { GImage } from '../GImage'
import { GLabel } from '../GLabel'
import { GList } from '../GList'
import { GLoader } from '../GLoader'
import { GMovieClip } from '../GMovieClip'
import { GObject } from '../GObject'
import { GProgressBar } from '../GProgressBar'
import { GRichTextField } from '../GRichTextField'
import { GScrollBar } from '../GScrollBar'
import { GSlider } from '../GSlider'
import { GTextField } from '../GTextField'
import { GTextInput } from '../GTextInput'
import { XmlNode } from '../utils/XMLParser'
import { PackageItem } from './PackageItem'
import { Decls } from './UIPackage'

type ExtensionClassDictionary = {
  [key: string]: new () => GComponent
}
export class UIObjectFactory {
  private static packageItemExtensions: ExtensionClassDictionary = {}
  private static loaderExtension: new () => GLoader

  public static setPackageItemExtension(url: string, type: { new (): GComponent }): void {
    UIObjectFactory.packageItemExtensions[url.substring(5)] = type
  }

  // public static setLoaderExtension(type: { new(): GLoader }): void {
  //     UIObjectFactory.loaderExtension = type;
  // }

  public static newObject(pi: PackageItem): GObject {
    switch (pi.type) {
      case PackageItemType.Image:
        return new GImage()

      case PackageItemType.MovieClip:
        return new GMovieClip()

      case PackageItemType.Component:
        let cls: { new (): GObject } = UIObjectFactory.packageItemExtensions[pi.owner.id + pi.id]
        if (cls) return new cls()

        let xml: XmlNode = pi.owner.getItemAsset(pi) as XmlNode
        let extention: string = xml.attributes.extention
        if (extention != null) {
          switch (extention) {
            case 'Button':
              return new GButton()
            case 'ProgressBar':
              return new GProgressBar()
            case 'Label':
              return new GLabel()
            case 'Slider':
              return new GSlider()
            case 'ScrollBar':
              return new GScrollBar()
            case 'ComboBox':
              return new GComboBox()
            default:
              return new GComponent()
          }
        } else return new GComponent()
    }
    return null
  }

  static newObjectDirectly(type: string): GObject {
    switch (type) {
      case 'image':
        return new GImage()

      case 'movieclip':
        return new GMovieClip()

      case 'component':
        return new GComponent()

      case 'text':
        return new GTextField()

      case 'list':
        return new GList()

      case 'richtext':
        return new GRichTextField()

      case 'inputtext':
        return new GTextInput()

      case 'group':
        return new GGroup()

      case 'graph':
        return new GGraph()

      case 'loader':
        if (UIObjectFactory.loaderExtension != null) return new UIObjectFactory.loaderExtension()
        else return new GLoader()
    }
    return null
  }
}

Decls.UIObjectFactory = UIObjectFactory
