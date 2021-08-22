import { ITeams } from "./Teams";

export interface ITeamAction {
    TeamItem: ITeams,
    TeamOperation: string
}

export interface IRoleAction {
    RoleItem: ITeams,
    RoleOperation: string
}