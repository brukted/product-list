import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/app-error";

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.statusCode >= 500 ? 'error' : 'fail',
            message: err.message,
        });
    }
    else if (err.name === 'ValidationError') {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
    else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}