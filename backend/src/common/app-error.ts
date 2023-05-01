export class AppError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
    }

    static badRequest(message: string) {
        return new AppError(message, 400);
    }

    static doesNotExist(message: string) {
        return new AppError(message, 404);
    }

    static internal(message: string) {
        return new AppError(message, 500);
    }
}