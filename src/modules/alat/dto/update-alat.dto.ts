import { PartialType } from '@nestjs/mapped-types';
import { CreateAlatDto } from './create-alat.dto';
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { AlatStatus } from '../entities/alat.entity';

export class UpdateAlatDto extends PartialType(CreateAlatDto) {
    @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AlatStatus)
  @IsOptional()
  status?: AlatStatus;
}

