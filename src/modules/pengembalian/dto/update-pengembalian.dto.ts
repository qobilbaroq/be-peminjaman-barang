import { PartialType } from '@nestjs/mapped-types';
import { CreatePengembalianDto } from './create-pengembalian.dto';

export class UpdatePengembalianDto extends PartialType(CreatePengembalianDto) {}
