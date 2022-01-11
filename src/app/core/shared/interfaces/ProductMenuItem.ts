export interface IProductMenuItem {
    Id: string;
    name: string;
    children?: IProductMenuItem[];
    order: number;
    parent: string;
    expanded: boolean;
}
