import { Injectable } from '@nestjs/common';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';

@Injectable()
export class PengembalianService {
  create(createPengembalianDto: CreatePengembalianDto) {
    return 'This action adds a new pengembalian';
  }

  findAll() {
    return `This action returns all pengembalian`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pengembalian`;
  }

  update(id: number, updatePengembalianDto: UpdatePengembalianDto) {
    return `This action updates a #${id} pengembalian`;
  }

  remove(id: number) {
    return `This action removes a #${id} pengembalian`;
  }
}
