import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      req.user = payload;
      next();
    } catch (error) {
      const message = error.name === 'TokenExpiredError'
        ? 'El token ha caducado'
        : 'Token inválido';
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
