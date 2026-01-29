import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeminjamanService } from './peminjaman.service';
import { PeminjamanController } from './peminjaman.controller';
import { Peminjaman } from './entities/peminjaman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peminjaman])],
  controllers: [PeminjamanController],
  providers: [PeminjamanService],
  exports: [PeminjamanService],
})
export class PeminjamanModule {}
