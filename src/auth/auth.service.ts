import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
      ) {}
    
      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          return {
            email: user.email,
            sub: user._id,
            name: user.name,
          };
        }
        return null;
      }
      
      
    
      async login(user: any) {
        const payload = { email: user.email, sub: user._id, name: user.name };
        return {
          access_token: this.jwtService.sign(payload),
          refresh_token: await this.generateRefreshToken(payload),
        };
      }
    
      async generateRefreshToken(payload: any) {
        return this.jwtService.sign(payload, { secret: 'jwt_secret_refresh', expiresIn: '1d' });
      }
    
      async refreshToken(refreshToken: string) {
        try {
          const user = this.jwtService.verify(refreshToken, { secret: 'jwt_secret_refresh' });
          const payload = { sub: user._id, email: user.email, name: user.name };
          return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken(payload),
          };
        } catch {
          throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
      }      
}
