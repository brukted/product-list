
import { User } from "../../../domain/entities/user";
import { IUserDataSource } from "../../interfaces/data-sources/user-data-source";
import { UserModel } from "./models/user";

export class MongoDBUserDataSource implements IUserDataSource {
    async getUserByUserName(userName: String): Promise<User | null> {
        return await UserModel.findOne({ username: userName }).then((res) => {
            if (res) {
                return {
                    id: res.id!!,
                    userName: res.username,
                    password: res.password,
                };
            } else {
                return null;
            }
        });
    }

    createUser(username: string, password: string): Promise<boolean> {
        const model = new UserModel({
            username: username,
            password: password,
        });
        return model.save().then((res) => {
            return res ? true : false;
        });
    }
}