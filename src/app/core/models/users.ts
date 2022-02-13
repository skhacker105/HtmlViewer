import { IUserBasic } from "@core/interfaces/User";

export class User implements IUserBasic {
    userId: string;
    userName: string;
    password?: string;
    constructor() {
        this.userId = null;
        this.userName = null;
        this.password = null;
    }
}