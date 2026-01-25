import { Module } from '@nestjs/common';
import { LogAktifitasService } from './log-aktifitas.service';
import { LogAktifitasController } from './log-aktifitas.controller';

@Module({
  controllers: [LogAktifitasController],
  providers: [LogAktifitasService],
})
export class LogAktifitasModule {}
