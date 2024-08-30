import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

export class AppException extends HttpException {
    constructor(message: string = 'Error de autenticación') {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class AppBadRequest extends HttpException {
    constructor(message: string) {
        super(
            message,
            HttpStatus.BAD_REQUEST
        );
    }
}

export class AppManyRequest extends HttpException {
    constructor(message: string) {
        super(
            message,
            HttpStatus.TOO_MANY_REQUESTS
        );
    }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        this.logger.error(`HTTP Error: ${exception.message}`, exception.stack);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
        });
    }
}