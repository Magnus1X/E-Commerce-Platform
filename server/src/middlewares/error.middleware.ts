import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
    static handle(err: any, req: Request, res: Response, next: NextFunction) {
        const statusCode = err.status || 500;
        const message = err.message || 'Internal Server Error';

        console.error(`[Error] ${statusCode} - ${message}`);
        if (err.stack) {
            console.error(err.stack);
        }

        res.status(statusCode).json({
            success: false,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        });
    }
}
