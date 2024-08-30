import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionNoSql } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = ConnectionNoSql(configService);        
        return { uri: db };
      },
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
