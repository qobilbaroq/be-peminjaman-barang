import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreatePengembalianDto {
  @IsNumber()
  @IsNotEmpty()
  peminjamanId: number;

  @IsDateString()
  @IsNotEmpty()
  tanggalKembali: string;

  @IsNumber()
  @IsOptional()
  denda?: number;
}