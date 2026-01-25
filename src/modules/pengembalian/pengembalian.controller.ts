import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';

@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) {}

  @Post()
  create(@Body() createPengembalianDto: CreatePengembalianDto) {
    return this.pengembalianService.create(createPengembalianDto);
  }

  @Get()
  findAll() {
    return this.pengembalianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengembalianService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePengembalianDto: UpdatePengembalianDto) {
    return this.pengembalianService.update(+id, updatePengembalianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengembalianService.remove(+id);
  }
}
