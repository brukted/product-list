import { RegisterRequest } from "../../../presentation/dtos/RegisterRequest";
import { User } from "../../entities/user";

export interface IUserRepository {
    createUser(registerRequest: RegisterRequest): Promise<boolean>;
    getUserByUserName(username: String): Promise<User | null>;
}