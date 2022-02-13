import { IUserBasic } from "@core/interfaces/User";

export interface IUser extends IUserBasic {
    roleId: string;
    teamIds: string[];
}