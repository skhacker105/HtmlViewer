export interface IUserBasic {
    userId: string;
    userName: string;
    password?: string;
    expiry?: Date;
}