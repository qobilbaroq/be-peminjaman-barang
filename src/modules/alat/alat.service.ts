import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alat, AlatStatus } from './entities/alat.entity';
import { Category } from '../category/entities/category.entity';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';

@Injectable()
export class AlatService {
  constructor(
    @InjectRepository(Alat)
    private alatRepository: Repository<Alat>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createAlatDto: CreateAlatDto): Promise<Alat> {
    const category = await this.categoryRepository.findOne({
      where: { id: createAlatDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    const alat = this.alatRepository.create(createAlatDto);
    return await this.alatRepository.save(alat);
  }

  async findAll(status?: AlatStatus, categoryId?: number): Promise<Alat[]> {
    const queryBuilder = this.alatRepository
      .createQueryBuilder('alat')
      .leftJoinAndSelect('alat.category', 'category');

    if (status) {
      queryBuilder.andWhere('alat.status = :status', { status });
    }

    if (categoryId) {
      queryBuilder.andWhere('alat.categoryId = :categoryId', { categoryId });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Alat> {
    const alat = await this.alatRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!alat) {
      throw new NotFoundException('Alat tidak ditemukan');
    }

    return alat;
  }

  async update(id: number, updateAlatDto: UpdateAlatDto): Promise<Alat> {
    const alat = await this.findOne(id);

    if (updateAlatDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateAlatDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Kategori tidak ditemukan');
      }
    }

    Object.assign(alat, updateAlatDto);
    return await this.alatRepository.save(alat);
  }

  async remove(id: number): Promise<void> {
    const alat = await this.findOne(id);
    await this.alatRepository.remove(alat);
  }
}
