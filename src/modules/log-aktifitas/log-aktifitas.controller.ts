import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogAktifitasService } from './log-aktifitas.service';
import { CreateLogAktifitaDto } from './dto/create-log-aktifita.dto';
import { UpdateLogAktifitaDto } from './dto/update-log-aktifita.dto';

@Controller('log-aktifitas')
export class LogAktifitasController {
  constructor(private readonly logAktifitasService: LogAktifitasService) {}

  @Post()
  create(@Body() createLogAktifitaDto: CreateLogAktifitaDto) {
    return this.logAktifitasService.create(createLogAktifitaDto);
  }

  @Get()
  findAll() {
    return this.logAktifitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logAktifitasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogAktifitaDto: UpdateLogAktifitaDto) {
    return this.logAktifitasService.update(+id, updateLogAktifitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logAktifitasService.remove(+id);
  }
}
