import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
// import { TokenController } from './token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { UsersModule } from 'src/security/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Token.name,
    schema: TokenSchema,
  }]),
  UsersModule
  ],
  // controllers: [TokenController],
  providers: [TokenService],
  exports:[TokenService],
})
export class TokenModule {}
