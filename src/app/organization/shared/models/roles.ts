import { IActionResult } from "src/app/core/shared/interfaces/ActionResult";
import { CoreHelper } from "src/app/core/shared/utilities/helper";
import { CoreResources } from "src/app/core/shared/utilities/resources";
import { IRoles } from "../interfaces/Roles";


export class Roles implements IRoles {
    Id: string;
    name: string;
    parentId: string;
    children: IRoles[];
    constructor(roleId: string, roleName: string, parentroleId: string) {
        this.Id = roleId ? roleId : CoreHelper.generateId();
        this.name = roleName;
        this.parentId = parentroleId;
        this.children = [];
    }

    addChild(roleId: string, roleName: string): IActionResult {
        let result: IActionResult = {
            completed: false
        };
        if (this.children.findIndex(t => t.name === roleName) >= 0) {
            result.message = CoreResources.RoleAlreadyExists;
        } else {
            const newChild = new Roles(roleId, roleName, this.Id);
            this.children.push(newChild);
            result.obj = newChild;
            result.completed = true;
        }
        return result;
    }

    removeChild(roleId: string): IActionResult {
        let result: IActionResult = {
            completed: false
        };
        const index = this.children.findIndex(t => t.Id === roleId);
        if (index >= 0) {
            this.children.splice(index, 1);
            result.completed = true;
        } else {
            result.message = CoreResources.RoleIdNotFound;
        }
        return result;
    }
}