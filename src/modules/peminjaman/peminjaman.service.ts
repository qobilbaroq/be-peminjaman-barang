import { Injectable } from '@nestjs/common';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  create(createPeminjamanDto: CreatePeminjamanDto) {
    return 'This action adds a new peminjaman';
  }

  findAll() {
    return `This action returns all peminjaman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} peminjaman`;
  }

  update(id: number, updatePeminjamanDto: UpdatePeminjamanDto) {
    return `This action updates a #${id} peminjaman`;
  }

  remove(id: number) {
    return `This action removes a #${id} peminjaman`;
  }
}
