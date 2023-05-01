import { AppError } from '../../../common/app-error';
import { RegisterRequest } from '../../../presentation/dtos/RegisterRequest';
import { IUserRepository } from "../../interfaces/repositories/user-repository";
import { IRegisterUserUseCase } from "../../interfaces/use-cases/auth/register-user";

export class RegisterUserUseCase implements IRegisterUserUseCase {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(registerRequest: RegisterRequest): Promise<boolean> {
        const user = await this.userRepository.getUserByUserName(registerRequest.username);
        if (user) {
            throw AppError.badRequest('Username already exists');
        }
        return await this.userRepository.createUser(registerRequest);
    };
}