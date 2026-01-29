import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pengembalian } from './entities/pengembalian.entity';
import { Alat, AlatStatus } from '../alat/entities/alat.entity';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { LogAktifita } from '../log-aktifitas/entities/log-aktifita.entity';
import { Peminjaman, PeminjamanStatus } from '../peminjaman/entities/peminjaman.entity';

@Injectable()
export class PengembalianService {
  constructor(
    @InjectRepository(Pengembalian)
    private pengembalianRepository: Repository<Pengembalian>,
    @InjectRepository(Peminjaman)
    private peminjamanRepository: Repository<Peminjaman>,
    @InjectRepository(Alat)
    private alatRepository: Repository<Alat>,
    @InjectRepository(LogAktifita)
    private logAktifitasRepository: Repository<LogAktifita>,
  ) {}

  async create(
    createPengembalianDto: CreatePengembalianDto,
    userId: number,
  ): Promise<Pengembalian> {
    // Cek peminjaman
    const peminjaman = await this.peminjamanRepository.findOne({
      where: { id: createPengembalianDto.peminjamanId },
      relations: ['alat'],
    });

    if (!peminjaman) {
      throw new NotFoundException('Peminjaman tidak ditemukan');
    }

    if (peminjaman.status !== PeminjamanStatus.APPROVED) {
      throw new BadRequestException('Hanya peminjaman yang approved yang bisa dikembalikan');
    }

    // Cek apakah sudah ada pengembalian
    const existingReturn = await this.pengembalianRepository.findOne({
      where: { peminjamanId: peminjaman.id },
    });

    if (existingReturn) {
      throw new BadRequestException('Peminjaman ini sudah dikembalikan');
    }

    // Hitung denda jika terlambat
    let denda = createPengembalianDto.denda || 0;
    const tanggalKembali = new Date(createPengembalianDto.tanggalKembali);
    const jatuhTempo = new Date(peminjaman.tanggalKembali);

    if (tanggalKembali > jatuhTempo) {
      const hariTerlambat = Math.ceil(
        (tanggalKembali.getTime() - jatuhTempo.getTime()) / (1000 * 60 * 60 * 24),
      );
      denda = hariTerlambat * 5000; // Rp 5000 per hari
    }

    // Buat pengembalian
    const pengembalian = this.pengembalianRepository.create({
      peminjamanId: peminjaman.id,
      tanggalKembali,
      denda,
    });

    const saved = await this.pengembalianRepository.save(pengembalian);

    // Update status peminjaman
    await this.peminjamanRepository.update(peminjaman.id, {
      status: PeminjamanStatus.RETURNED,
    });

    // Update status alat menjadi available
    await this.alatRepository.update(peminjaman.alat.id, {
      status: AlatStatus.AVAILABLE,
    });

    // Log aktivitas
    await this.logAktifitasRepository.save({
      userId,
      action: 'CREATE_PENGEMBALIAN',
      description: `Mengembalikan alat dari peminjaman ID: ${peminjaman.id}, denda: Rp ${denda}`,
    });

    return saved;
  }

  async findAll(): Promise<Pengembalian[]> {
    return await this.pengembalianRepository.find({
      relations: ['peminjaman', 'peminjaman.user', 'peminjaman.alat'],
    });
  }

  async findOne(id: number): Promise<Pengembalian> {
    const pengembalian = await this.pengembalianRepository.findOne({
      where: { id },
      relations: ['peminjaman', 'peminjaman.user', 'peminjaman.alat', 'peminjaman.alat.category'],
    });

    if (!pengembalian) {
      throw new NotFoundException('Pengembalian tidak ditemukan');
    }

    return pengembalian;
  }

  async findByPeminjaman(peminjamanId: number): Promise<Pengembalian> {
    const pengembalian = await this.pengembalianRepository.findOne({
      where: { peminjamanId },
      relations: ['peminjaman', 'peminjaman.user', 'peminjaman.alat'],
    });

    if (!pengembalian) {
      throw new NotFoundException('Pengembalian untuk peminjaman ini tidak ditemukan');
    }

    return pengembalian;
  }
}
