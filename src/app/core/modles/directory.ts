import { IContainerProperties } from "../interfaces/ControlProperties";
import { IPageControl, IPageControlEvents, IPageControlProperties, IPageControlDirectory } from "../interfaces/PageControl";
import { CoreResources } from "../utilities/resources";
import { ButtonControl, ContainerControl, TextBoxControl } from "./controls";

export abstract class PageDirectory implements IPageControlDirectory {

    AllowedChildren: string[];
    menuId: string;
    controlProperties: IPageControlProperties;
    controlEvents?: IPageControlEvents;
    children?: IPageControl[];
    selected: boolean;
    constructor() {
        this.populateAllowedChildren();
    }
    getProperties(): string[] {
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
        controlType: CoreResources.Controls.container,
        parentControlId: null,
        order: 0
    };
    populateAllowedChildren(): void {
        this.AllowedChildren = [
            CoreResources.Controls.container,
            CoreResources.Controls.textbox,
            CoreResources.Controls.button
        ];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new ContainerControl(menuId, parentControlId, controlName, order);
    }
}
export const containerDirectoryObj = new ContainerDirectory();

class TextBoxDirectory extends PageDirectory {
    populateAllowedChildren(): void {
        this.AllowedChildren = [];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new TextBoxControl(menuId, parentControlId, controlName, order);
    }
}
export const textBoxDirectoryObj = new TextBoxDirectory();

class ButtonDirectory extends PageDirectory {
    populateAllowedChildren(): void {
        this.AllowedChildren = [];
    }
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
        return new ButtonControl(menuId, parentControlId, controlName, order);
    }
}
export const buttonDirectoryObj = new ButtonDirectory();
