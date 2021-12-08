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
    controlId: string;
    parentControlId: string;

    constructor(controlId: string, menuId: string, parentControlId: string, controlName: string, order: number) {
        this.menuId = menuId;
        this.parentControlId = parentControlId;
        this.controlProperties = {
            controlId: controlId ? controlId : CoreHelper.generateId(),
            controlName: controlName,
            controlType: '',
            order: order,
            height: '',
            position: ControlPosition.normal,
            width: ''
        };
        this.controlEvents = {
            click: false,
            keyDown: false,
            keyUp: false,
            mouseOut: false,
            mouseOver: false
        };
        this.controlId = this.controlProperties.controlId;
    }
    abstract getDirectory(): IPageControlDirectory;
    getProperties(): string[] {
        return Object.keys(this.controlProperties);
    };
    getEvents(): string[] {
        return Object.keys(this.controlEvents);
    };
}

export class ContainerControl extends PageControl {
    controlProperties: IContainerProperties;
    constructor(controlId: string, menuId: string, parentControlId: string, controlName: string, order: number, controlProperties?: IPageControlProperties, controlEvents?: IPageControlEvents) {
        super(controlId, menuId, parentControlId, controlName, order);
        if (!controlProperties) {
            this.controlProperties.controlType = CoreResources.Controls.container;
            this.controlProperties.width = '100%';
            this.controlProperties.headerAvtarClass = '';
            this.controlProperties.headerTitle = '';
            this.controlProperties.headerSubTitle = '';
            this.controlProperties.imageSrc = '';
            this.controlProperties.controlAlignment = ControlAlignment.left;
        } else {
            this.controlProperties = controlProperties;
        }
        if (controlEvents) {
            this.controlEvents = controlEvents;
        }
    }
    getDirectory(): IPageControlDirectory {
        return containerDirectoryObj;
    }
}

export class TextBoxControl extends PageControl {
    controlProperties: ILabledControlProperties;
    constructor(controlId: string, menuId: string, parentControlId: string, controlName: string, order: number, controlProperties?: ILabledControlProperties, controlEvents?: IPageControlEvents) {
        super(controlId, menuId, parentControlId, controlName, order);
        if (!controlProperties) {
            this.controlProperties.controlType = CoreResources.Controls.textbox;
            this.controlProperties.labelName = controlName ? controlName : 'Label';
            this.controlProperties.placeHolder = 'TEXT';
        } else {
            this.controlProperties = controlProperties;
        }
        if (controlEvents) {
            this.controlEvents = controlEvents;
        }
    }
    getDirectory(): IPageControlDirectory {
        return textBoxDirectoryObj;
    }
}

export class ButtonControl extends PageControl {
    controlProperties: ILabledControlProperties;
    constructor(controlId: string, menuId: string, parentControlId: string, controlName: string, order: number, controlProperties?: ILabledControlProperties, controlEvents?: IPageControlEvents) {
        super(controlId, menuId, parentControlId, controlName, order);
        if (!controlProperties) {
            this.controlProperties.controlType = CoreResources.Controls.button;
            this.controlProperties.labelName = controlName ? controlName : 'Button';
        } else {
            this.controlProperties = controlProperties;
        }
        if (controlEvents) {
            this.controlEvents = controlEvents;
        }
    }
    getDirectory(): IPageControlDirectory {
        return buttonDirectoryObj;
    }
}