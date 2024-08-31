import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { ConceptsController } from './concepts.controller';

@Module({
  controllers: [ConceptsController],
  providers: [ConceptsService],
})
export class ConceptsModule {}
