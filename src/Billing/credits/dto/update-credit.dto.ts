import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditDto } from './create-credit.dto';

export class UpdateCreditDto extends PartialType(CreateCreditDto) {}
