import { IContainerProperties } from "../interfaces/ControlProperties";
import { PageResources } from "../utilities/resources";
import { ButtonControl, ContainerControl, TextBoxControl } from "./controls";
import { IPageControlDirectory, IPageControlProperties, IPageControlEvents, IPageControl } from "./PageControl";

export abstract class PageDirectory implements IPageControlDirectory {

    AllowedChildren: string[];
    menuId: string;
    controlProperties: IPageControlProperties;
    controlEvents?: IPageControlEvents;
    children?: IPageControl[];
    selected: boolean;
    controlId: string;
    parentControlId: string;
    constructor() {
        this.populateAllowedChildren();
    }
    getProperties(): string[] {
        throw new Error("Method not implemented.");
    }
    getEvents(): string[] {
        throw new Error("Method not implemented.");
    }
    getDirectory(): IPageControlDirectory {
        throw new Error("Method not implemented.");
    }
    abstract populateAllowedChildren(): void;
    abstract getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl;
}

class ContainerDirectory extends PageDirectory {
    controlProperties: IContainerProperties = {
        controlId: '',
        controlName: '',
        controlType: PageResources.Controls.container,
        order: 0
    };
    populateAllowedChildren(): void {
        this.AllowedChildren = [
            PageResources.Controls.container,
            PageResources.Controls.textbox,
            PageResources.Controls.button
        ];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new ContainerControl(null, menuId, parentControlId, controlName, order);
    }
}
export const containerDirectoryObj = new ContainerDirectory();

class TextBoxDirectory extends PageDirectory {
    populateAllowedChildren(): void {
        this.AllowedChildren = [];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new TextBoxControl(null, menuId, parentControlId, controlName, order);
    }
}
export const textBoxDirectoryObj = new TextBoxDirectory();

class ButtonDirectory extends PageDirectory {
    populateAllowedChildren(): void {
        this.AllowedChildren = [];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new ButtonControl(null, menuId, parentControlId, controlName, order);
    }
}
export const buttonDirectoryObj = new ButtonDirectory();
