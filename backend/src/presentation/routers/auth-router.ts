import express, { Request, Response } from 'express'
import { IRegisterUserUseCase } from '../../domain/interfaces/use-cases/auth/register-user'
import { ISignInUseCase } from '../../domain/interfaces/use-cases/auth/sign-in-user'


export default function AuthRouter(
    signInUserUseCase: ISignInUseCase,
    registerUserUseCase: IRegisterUserUseCase
) {
    const router = express.Router()

    router.post('/sign-in', async (req: Request, res: Response) => {
        const token = await signInUserUseCase.execute(req.body);
        res.statusCode = 200
        res.json({ message: "Sign in successful", token: token })
    })

    router.post('/register', async (req: Request, res: Response) => {
        await registerUserUseCase.execute(req.body);
        res.statusCode = 201
        res.json({ message: "Sign up successful" })
    })
    return router
}