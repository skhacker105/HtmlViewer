import { IPageControlProperties } from "../models/PageControl";
import { ControlAlignment } from "./enumerations";

export interface IContainerProperties extends IPageControlProperties {
    headerAvtarClass?: string;
    headerTitle?: string;
    headerSubTitle?: string;
    imageSrc?: string;
    actions?: any[];
    controlAlignment?: ControlAlignment;
}

export interface ILabledControlProperties extends IPageControlProperties {
    labelName: string;
    placeHolder?: string;
}