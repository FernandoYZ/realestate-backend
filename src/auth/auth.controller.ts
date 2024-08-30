import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { AppBadRequest } from 'src/app.exception';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
      ) {}
    
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh')
  async refreshToken(@Req() request: Request) {
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new AppBadRequest('Token de actualización no proporcionado');
    }
    return await this.authService.refreshToken(token);
  }
}
