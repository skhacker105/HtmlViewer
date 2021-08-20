import { ControlPosition } from "../utilities/enumerations";
import { IContainerProperties } from "./ControlProperties";

export interface IPageControl {
    menuId: string;
    controlProperties: IPageControlProperties;
    controlEvents?: IPageControlEvents;
    selected: boolean;
    children?: IPageControl[];
    getDirectory(): IPageControlDirectory;
    getProperties(): string[];
}

export interface IPageControlProperties {
    controlId: string;
    controlName: string;
    controlType: string;
    parentControlId: string;
    order: number;
    width?: string;
    height?: string;
    position?: ControlPosition;
}

export interface IPageControlEvents {
    click?: string;
    mouseOver?: string;
    mouseOut?: string;
    keyUp?: string;
    keyDown?: string;
}

export interface IPageControlDirectory extends IPageControl {
    AllowedChildren: string[];
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl;
    populateAllowedChildren(): void;
}
