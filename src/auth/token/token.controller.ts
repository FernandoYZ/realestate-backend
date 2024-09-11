import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.saveToken(createTokenDto.user, createTokenDto.token, createTokenDto.expiresAt);
  }

  @Delete(':token')
  async remove(@Param('token') token: string) {
    return this.tokenService.deleteToken(token);
  }
}
