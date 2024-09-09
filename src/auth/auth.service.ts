import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AppException, AppManyRequest } from 'src/app.exception';
import { UsersService } from 'src/security/users/users.service';

@Injectable()
export class AuthService {
  private readonly maxLoginAttempts = 5;
  private readonly loginAttemptWindow = 10 * 60 * 1000;
  private loginAttempts = new Map<string, { attempts: number; firstAttemptTime: number }>();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        // id: user._id,
        email: user.email,
        dni: user.identity_document,
        gender: user.gender,
        name: user.name,
        access: user.access,
      };
    }
    return null;
  }

  async login(email: string, password: string) {
    this.checkLoginAttempts(email);

    const user = await this.validateUser(email, password);
    if (!user) {
      this.incrementLoginAttempts(email);
      throw new AppException('Credenciales no válidas');
    }

    this.resetLoginAttempts(email); 
    const tokens = await this.generateTokens(user);
    return { ...tokens, user };
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return await this.generateTokens(user);
    } catch (error) {
      const message = error.name === 'TokenExpiredError'
        ? 'El token de actualización ha caducado'
        : 'Token de actualización inválido';
      throw new AppException(message);
    }
  }

  private async generateTokens(user): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: user.sub, email: user.email, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private checkLoginAttempts(email: string) {
    const attemptInfo = this.loginAttempts.get(email);
    const currentTime = Date.now();

    if (attemptInfo) {
      if (currentTime - attemptInfo.firstAttemptTime > this.loginAttemptWindow) {
        this.resetLoginAttempts(email);
      } else if (attemptInfo.attempts >= this.maxLoginAttempts) {
        throw new AppManyRequest('Demasiados intentos de inicio de sesión, inténtelo de nuevo más tarde');
      }
    }
  }

  private incrementLoginAttempts(email: string) {
    const attemptInfo = this.loginAttempts.get(email) || { attempts: 0, firstAttemptTime: Date.now() };
    attemptInfo.attempts += 1;
    this.loginAttempts.set(email, attemptInfo);
  }

  private resetLoginAttempts(email: string) {
    this.loginAttempts.delete(email);
  }
}
