import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export function protectRoute(request: AuthenticatedRequest, response: Response, next: NextFunction): Response<any, Record<string, any>> {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: 'UnAuthorized' });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        request.userId = (payload as JwtPayload).id;
        next();
        return response;
    }
    catch (error) {
        return response.status(401).json({ message: 'Invalid token' });
    }
}