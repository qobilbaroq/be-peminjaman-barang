import { Controller, Get, Query, Param } from '@nestjs/common';
import { LogAktifitasService } from './log-aktifitas.service';

@Controller('log-aktifitas')
export class LogAktifitasController {
  constructor(private readonly logAktifitasService: LogAktifitasService) {}

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('limit') limit?: string,
  ) {
    return this.logAktifitasService.findAll(
      userId ? +userId : undefined,
      limit ? +limit : 100,
    );
  }

  @Get('action/:action')
  findByAction(@Param('action') action: string) {
    return this.logAktifitasService.findByAction(action);
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ) {
    return this.logAktifitasService.findByUser(+userId, limit ? +limit : 50);
  }
}
