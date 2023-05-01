import { SignInRequest } from "../../../presentation/dtos/SignInRequest";
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { ISignInUseCase } from "../../interfaces/use-cases/auth/sign-in-user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../../config";
import { AppError } from "../../../common/app-error";

export class SignInUserUseCase implements ISignInUseCase {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(signInRequest: SignInRequest): Promise<String> {
        const user = await this.userRepository.getUserByUserName(signInRequest.username);
        if (user === null) {
            throw AppError.badRequest('User or password is incorrect');
        }
        const passwordMatch = bcrypt.compare(signInRequest.password, user.password);
        if (!passwordMatch) {
            throw AppError.badRequest('User or password is incorrect');
        }
        return jwt.sign({ id: user.id }, JWT_SECRET);
    };
}