import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
      ) {}
    
      @Post('login')
      async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return await this.authService.login(user);
      }
    
      @Post('refresh')
      async refreshToken(@Req() request: Request) {
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) {
          throw new HttpException('Refresh token not provided', HttpStatus.BAD_REQUEST);
        }
        return await this.authService.refreshToken(token);
      }
}
