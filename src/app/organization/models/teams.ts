import { IActionResult } from "@core/interfaces/ActionResult";
import { CoreHelper } from "@core/utilities/helper";
import { OriganizationResources } from "@organization/utilities/organization-resources";
import { ITeams } from "../interfaces/Teams";

export class Teams implements ITeams {
    Id: string;
    name: string;
    parentId: string;
    children: ITeams[];
    constructor(teamId: string, teamName: string, parentTeamId: string) {
        this.Id = teamId ? teamId : CoreHelper.generateId();
        this.name = teamName;
        this.parentId = parentTeamId;
        this.children = [];
    }

    addChild(teamId: string, teamName: string): IActionResult {
        let result: IActionResult = {
            completed: false
        };
        if (this.children.findIndex(t => t.name === teamName) >= 0) {
            result.message = OriganizationResources.TeamAlreadyExists;
        } else {
            const newChild = new Teams(teamId, teamName, this.Id);
            this.children.push(newChild);
            result.obj = newChild;
            result.completed = true;
        }
        return result;
    }

    removeChild(teamId: string): IActionResult {
        let result: IActionResult = {
            completed: false
        };
        const index = this.children.findIndex(t => t.Id === teamId);
        if (index >= 0) {
            this.children.splice(index, 1);
            result.completed = true;
        } else {
            result.message = OriganizationResources.TeamIdNotFound;
        }
        return result;
    }
}