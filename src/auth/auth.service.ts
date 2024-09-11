import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppException, AppManyRequest } from 'src/app.exception';
import { UsersService } from 'src/security/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenService } from './token/token.service';
import { Request } from 'express';
import { Status } from 'src/enums/status.enum';
import * as bcrypt from 'bcrypt';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  private readonly maxLoginAttempts = 5;
  private readonly loginAttemptWindow = 10 * 60 * 1000;
  private loginAttempts = new Map<string, { attempts: number; firstAttemptTime: number }>();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService, 
  ) {}

  // Validación del usuario con estados
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) throw new AppException('Credenciales no válidas');
    if (user.status === Status.disabled || user.status === Status.deleted) throw new AppException('Cuenta inactiva, contacta al administrador');
    if (user.status === Status.pending) throw new AppException('Verifica tu correo electrónico para iniciar sesión');

    if (user && await bcrypt.compare(password, user.password)) {
      return {
        sub: user._id,
        email: user.email,
        dni: user.identity_document,
        gender: user.gender,
        name: user.name,
        access: user.access, 
      };
    }
    return null;
  }

  async login(email: string, password: string, request: Request) {
    const ip = request.ip; 
    this.checkLoginAttempts(email, ip);
  
    const user = await this.validateUser(email, password);
    if (!user) {
      this.incrementLoginAttempts(email, ip);
      throw new AppException('Credenciales no válidas');
    }
  
    this.resetLoginAttempts(email, ip); 
    const tokens = await this.generateTokens(user);

    const refreshTokenExpiration = this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME');
    const expiresAt = new Date(Date.now() + ms(refreshTokenExpiration));

    await this.tokenService.saveToken(
      user.sub,
      tokens.refresh_token,
      expiresAt
    );
  
    // await this.tokenService.saveToken(user.sub, tokens.refresh_token, new Date(Date.now() + this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME') * 1000));
  
    await this.tokenService.addIpIfNotExists(user.sub, ip);
  
    return { ...tokens, user };
  }

  async refreshToken(refreshToken: string, ip: string) {
    try {
      const storedToken = await this.tokenService.findToken(refreshToken);
      if (!storedToken) throw new AppException('Token de actualización inválido');

      const user = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // Eliminar el antiguo refresh token y generar uno nuevo
      await this.tokenService.deleteToken(refreshToken);
      const newTokens = await this.generateTokens(user);
      await this.tokenService.saveToken(user.sub, newTokens.refresh_token, new Date(Date.now() + this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME') * 1000));

      return newTokens;
    } catch (error) {
      const message = error.name === 'TokenExpiredError' ? 'El token de actualización ha caducado' : 'Token de actualización inválido';
      throw new AppException(message);
    }
  }

  // Generación de tokens JWT
  private async generateTokens(user): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: user.sub, email: user.email, name: user.name, access: user.access };
    
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
    });
    
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  // Manejo de intentos de login
  private checkLoginAttempts(email: string, ip: string) {
    const key = `${email}-${ip}`;
    const attemptInfo = this.loginAttempts.get(key);
    const currentTime = Date.now();

    if (attemptInfo) {
      if (currentTime - attemptInfo.firstAttemptTime > this.loginAttemptWindow) {
        this.resetLoginAttempts(email, ip);
      } else if (attemptInfo.attempts >= this.maxLoginAttempts) {
        throw new AppManyRequest('Demasiados intentos de inicio de sesión, inténtelo de nuevo más tarde');
      }
    }
  }

  private incrementLoginAttempts(email: string, ip: string) {
    const key = `${email}-${ip}`;
    const attemptInfo = this.loginAttempts.get(key) || { attempts: 0, firstAttemptTime: Date.now() };
    attemptInfo.attempts += 1;
    this.loginAttempts.set(key, attemptInfo);
  }

  private resetLoginAttempts(email: string, ip: string) {
    const key = `${email}-${ip}`;
    this.loginAttempts.delete(key);
  }
}
