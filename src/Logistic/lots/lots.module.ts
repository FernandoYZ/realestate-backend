import { Module } from '@nestjs/common';
import { LotsService } from './lots.service';
import { LotsController } from './lots.controller';

@Module({
  controllers: [LotsController],
  providers: [LotsService],
})
export class LotsModule {}
