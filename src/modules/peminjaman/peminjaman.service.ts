import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Peminjaman } from './entities/peminjaman.entity';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(
    @InjectRepository(Peminjaman)
    private peminjamanRepository: Repository<Peminjaman>,
  ) {}

  async create(createPeminjamanDto: CreatePeminjamanDto): Promise<Peminjaman> {
    const peminjaman = this.peminjamanRepository.create(createPeminjamanDto as Partial<Peminjaman>);
    return await this.peminjamanRepository.save(peminjaman as Peminjaman);
  }

  async findAll(): Promise<Peminjaman[]> {
    return await this.peminjamanRepository.find({
      relations: ['user', 'petugas', 'alat', 'pengembalian'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Peminjaman> {
    const peminjaman = await this.peminjamanRepository.findOne({
      where: { id },
      relations: ['user', 'petugas', 'alat', 'pengembalian'],
    });

    if (!peminjaman) {
      throw new NotFoundException('Peminjaman tidak ditemukan');
    }

    return peminjaman;
  }

  async update(id: number, updatePeminjamanDto: UpdatePeminjamanDto): Promise<Peminjaman> {
    const peminjaman = await this.findOne(id);
    Object.assign(peminjaman, updatePeminjamanDto);
    return await this.peminjamanRepository.save(peminjaman);
  }

  async remove(id: number): Promise<void> {
    const peminjaman = await this.findOne(id);
    await this.peminjamanRepository.remove(peminjaman);
  }
}
