import { ITeams } from "./Teams";
import { IUser } from "./Users";

export interface ITeamAction {
    TeamItem: ITeams,
    TeamOperation: string
}

export interface IRoleAction {
    RoleItem: ITeams,
    RoleOperation: string
}

export interface IUserAction {
    UserItem: IUser,
    UserOperation: string
}