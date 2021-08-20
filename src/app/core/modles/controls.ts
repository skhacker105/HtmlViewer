import { IContainerProperties, ILabledControlProperties } from "../interfaces/ControlProperties";
import { IPageControl, IPageControlEvents, IPageControlProperties, IPageControlDirectory } from "../interfaces/PageControl";
import { ControlAlignment, ControlPosition } from "../utilities/enumerations";
import { CoreHelper } from "../utilities/helper";
import { CoreResources } from "../utilities/resources";
import { buttonDirectoryObj, containerDirectoryObj, textBoxDirectoryObj } from "./directory";


export abstract class PageControl implements IPageControl {
    menuId: string;
    controlEvents?: IPageControlEvents;
    controlProperties: IPageControlProperties;
    children?: IPageControl[];
    selected = false;

    constructor(menuId: string, parentControlId: string, controlName: string, order: number) {
        this.menuId = menuId;
        this.controlProperties = {
            controlId: CoreHelper.generateId(),
            controlName: controlName,
            controlType: '',
            order: order,
            parentControlId: parentControlId,
            height: '',
            position: ControlPosition.normal,
            width: ''
        };
    }
    abstract getDirectory(): IPageControlDirectory;
    getProperties(): string[] {
        return Object.keys(this.controlProperties);
    };
}

export class ContainerControl extends PageControl {
    controlProperties: IContainerProperties;
    constructor(menuId: string, parentControlId: string, controlName: string, order: number) {
        super(menuId, parentControlId, controlName, order);
        this.controlProperties.controlType = CoreResources.Controls.container;
        this.controlProperties.width = '100%';
        this.controlProperties.headerAvtarClass = '';
        this.controlProperties.headerTitle = '';
        this.controlProperties.headerSubTitle = '';
        this.controlProperties.imageSrc = '';
        this.controlProperties.controlAlignment = ControlAlignment.left;
    }
    getDirectory(): IPageControlDirectory {
        return containerDirectoryObj;
    }
}

export class TextBoxControl extends PageControl {
    controlProperties: ILabledControlProperties;
    constructor(menuId: string, parentControlId: string, controlName: string, order: number) {
        super(menuId, parentControlId, controlName, order);
        this.controlProperties.controlType = CoreResources.Controls.textbox;
        this.controlProperties.labelName = controlName ? controlName : 'Label';
        this.controlProperties.placeHolder = 'TEXT';
    }
    getDirectory(): IPageControlDirectory {
        return textBoxDirectoryObj;
    }
}

export class ButtonControl extends PageControl {
    controlProperties: ILabledControlProperties;
    constructor(menuId: string, parentControlId: string, controlName: string, order: number) {
        super(menuId, parentControlId, controlName, order);
        this.controlProperties.controlType = CoreResources.Controls.button;
        this.controlProperties.labelName = controlName ? controlName : 'Button';
    }
    getDirectory(): IPageControlDirectory {
        return buttonDirectoryObj;
    }
}