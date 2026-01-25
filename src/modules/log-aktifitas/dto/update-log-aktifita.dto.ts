import { PartialType } from '@nestjs/mapped-types';
import { CreateLogAktifitaDto } from './create-log-aktifita.dto';

export class UpdateLogAktifitaDto extends PartialType(CreateLogAktifitaDto) {}
