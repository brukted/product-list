import { RegisterRequest } from "../../../../presentation/dtos/RegisterRequest";

export interface IRegisterUserUseCase {
    execute(registerRequest: RegisterRequest): Promise<boolean>;
}