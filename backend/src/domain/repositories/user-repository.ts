import { IUserDataSource } from "../../data/interfaces/data-sources/user-data-source";
import { RegisterRequest } from "../../presentation/dtos/RegisterRequest";
import { User } from "../entities/user";
import { IUserRepository } from "../interfaces/repositories/user-repository";

export class UserRepositoryImpl implements IUserRepository {
    userDataSource: IUserDataSource;

    constructor(userDataSource: IUserDataSource) {
        this.userDataSource = userDataSource;
    }

    async createUser(registerRequest: RegisterRequest): Promise<boolean> {
        return await this.userDataSource.createUser(registerRequest.username, registerRequest.password);
    }

    async getUserByUserName(userName: String): Promise<User | null> {
        return await this.userDataSource.getUserByUserName(userName);
    }
}