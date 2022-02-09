import { IUserBasic } from "@core/shared/interfaces/User";

export interface IUser extends IUserBasic {
    roleId: string;
    teamIds: string[];
}