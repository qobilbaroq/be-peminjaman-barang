import { PartialType } from '@nestjs/mapped-types';
import { CreateAlatDto } from './create-alat.dto';

export class UpdateAlatDto extends PartialType(CreateAlatDto) {}
