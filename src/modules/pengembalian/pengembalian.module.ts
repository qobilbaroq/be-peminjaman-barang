import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PengembalianController } from './pengembalian.controller';
import { PengembalianService } from './pengembalian.service';
import { Pengembalian } from './entities/pengembalian.entity';
import { Peminjaman } from '../peminjaman/entities/peminjaman.entity';
import { Alat } from '../alat/entities/alat.entity';
import { LogAktifita } from '../log-aktifitas/entities/log-aktifita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pengembalian, Peminjaman, Alat, LogAktifita])],
  controllers: [PengembalianController],
  providers: [PengembalianService],
  exports: [PengembalianService],
})
export class PengembalianModule {}
