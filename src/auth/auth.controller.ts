import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AppBadRequest } from 'src/app.exception';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return await this.authService.login(loginDto.email, loginDto.password, request);
  }

  @Post('refresh')
  async refreshToken(@Req() request: Request) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new AppBadRequest('Token de actualización no proporcionado');
    }
    return await this.authService.refreshToken(token, request.ip);
  }
}
