import { Injectable } from '@nestjs/common';
import { CreateLogAktifitaDto } from './dto/create-log-aktifita.dto';
import { UpdateLogAktifitaDto } from './dto/update-log-aktifita.dto';

@Injectable()
export class LogAktifitasService {
  create(createLogAktifitaDto: CreateLogAktifitaDto) {
    return 'This action adds a new logAktifita';
  }

  findAll() {
    return `This action returns all logAktifitas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logAktifita`;
  }

  update(id: number, updateLogAktifitaDto: UpdateLogAktifitaDto) {
    return `This action updates a #${id} logAktifita`;
  }

  remove(id: number) {
    return `This action removes a #${id} logAktifita`;
  }
}
