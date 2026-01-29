import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAktifitasService } from './log-aktifitas.service';
import { LogAktifitasController } from './log-aktifitas.controller';
import { LogAktifita } from './entities/log-aktifita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogAktifita])],
  controllers: [LogAktifitasController],
  providers: [LogAktifitasService],
  exports: [LogAktifitasService],
})
export class LogAktifitasModule {}
