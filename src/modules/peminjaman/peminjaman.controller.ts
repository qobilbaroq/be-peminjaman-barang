import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  @Post()
  create(@Body() createPeminjamanDto: CreatePeminjamanDto) {
    return this.peminjamanService.create(createPeminjamanDto);
  }

  @Get()
  findAll() {
    return this.peminjamanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peminjamanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeminjamanDto: UpdatePeminjamanDto) {
    return this.peminjamanService.update(+id, updatePeminjamanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peminjamanService.remove(+id);
  }
}
