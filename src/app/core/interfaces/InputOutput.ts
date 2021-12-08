import { IODataTypes } from "../utilities/enumerations";

export interface IPageInput {
    eventId: string;
    eventName: string;
    eventType: IODataTypes;
    menuId: string;
    controlId: string;
    isOutput: boolean;
}

export interface IPageOutput extends IPageInput {
    value: any;
}
export interface IPageIO extends IPageOutput {
}