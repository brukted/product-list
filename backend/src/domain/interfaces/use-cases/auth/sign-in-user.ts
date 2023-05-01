import { SignInRequest } from "../../../../presentation/dtos/SignInRequest";

export interface ISignInUseCase {
    execute(signInRequest: SignInRequest): Promise<String>;
}