import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { AlatStatus } from '../entities/alat.entity';

export class CreateAlatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AlatStatus)
  @IsOptional()
  status?: AlatStatus;
}
