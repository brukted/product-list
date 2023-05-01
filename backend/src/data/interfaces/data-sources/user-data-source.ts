import { User } from "../../../domain/entities/user";

export interface IUserDataSource {
    createUser(username: string, password: string): Promise<boolean>;
    getUserByUserName(userName: String): Promise<User | null>;
}