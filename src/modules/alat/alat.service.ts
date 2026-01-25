import { Injectable } from '@nestjs/common';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';

@Injectable()
export class AlatService {
  create(createAlatDto: CreateAlatDto) {
    return 'This action adds a new alat';
  }

  findAll() {
    return `This action returns all alat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alat`;
  }

  update(id: number, updateAlatDto: UpdateAlatDto) {
    return `This action updates a #${id} alat`;
  }

  remove(id: number) {
    return `This action removes a #${id} alat`;
  }
}
