import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'jwt_secret',
      signOptions: { expiresIn: '6h' }, 
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
