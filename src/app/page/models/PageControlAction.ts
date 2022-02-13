import { IPageControl } from "./PageControl";

export interface IPageControlAction {
    StoreControlItem?: IPageControl,
    ControlItem: IPageControl,
    ControlOperation: string
}