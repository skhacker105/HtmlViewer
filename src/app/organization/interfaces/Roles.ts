import { IActionResult } from "@core/interfaces/ActionResult";

export interface IRoles {
    Id: string;
    name: string;
    parentId: string;
    children: IRoles[];
    addChild(roleId: string, roleName: string): IActionResult;
    removeChild(roleId: string): IActionResult
}