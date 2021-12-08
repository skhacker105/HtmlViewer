import { ControlPosition } from "../utilities/enumerations";
import { IPageInput, IPageOutput } from "./InputOutput";

export interface IPageControl {
    menuId: string;
    controlId: string;
    parentControlId: string;
    controlProperties: IPageControlProperties;
    controlEvents?: IPageControlEvents;
    selected: boolean;
    children?: IPageControl[];
    getDirectory(): IPageControlDirectory;
    getProperties(): string[];
    getEvents(): string[];
}

export interface IPageControlProperties {
    controlId: string;
    controlName: string;
    controlType: string;
    order: number;
    width?: string;
    height?: string;
    position?: ControlPosition;
    pageInput?: string;
}

export interface IPageControlEvents {
    click?: boolean;
    mouseOver?: boolean;
    mouseOut?: boolean;
    keyUp?: boolean;
    keyDown?: boolean;
}

export interface IPageControlDirectory extends IPageControl {
    AllowedChildren: string[];
    getNewInstance(menuId: string, parentControlId: string, controlName: string, order: number): IPageControl;
    populateAllowedChildren(): void;
}
