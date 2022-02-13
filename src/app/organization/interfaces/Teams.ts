import { IActionResult } from "@core/interfaces/ActionResult";

export interface ITeams {
    Id: string;
    name: string;
    parentId: string;
    children: ITeams[];
    addChild(teamId: string, teamName: string): IActionResult;
    removeChild(teamId: string): IActionResult
}