import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Access, AccessSchema } from './schemas/access.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name:Access.name,
      schema:AccessSchema
    }])
  ],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
