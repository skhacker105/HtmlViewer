import { CoreHelper } from "@core/utilities/helper";
import { IUser } from "../interfaces/Users";

export class Users implements IUser {
    userId: string;
    userName: string;
    roleId: string;
    teamIds: string[];

    constructor(userId: string, userName: string, roleId?: string, teamIds?: string) {
        this.userId = userId ? userId : CoreHelper.generateId();
        this.userName = userName;
        if (roleId) {
            this.roleId = roleId;
        }
        if (teamIds) {
            this.teamIds = teamIds ? teamIds.split(',') : [];
        } else {
            this.teamIds = [];
        }
    }

    setRole(roleId: string) {
        this.roleId = roleId;
    }

    addTeam(teamId: string) {
        this.teamIds.push(teamId);
    }

    deleteTeam(teamId: string) {
        const index = this.teamIds.findIndex(t => t === teamId);
        if (index >= 0) {
            this.teamIds.splice(index, 1);
        }
    }
}