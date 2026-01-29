import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';

@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) {}

  @Post()
  create(@Body() createPengembalianDto: CreatePengembalianDto, @Request() req) {
    // const userId = req.user.id; // dari JWT
    const userId = 1; // hardcoded untuk testing
    return this.pengembalianService.create(createPengembalianDto, userId);
  }

  @Get()
  findAll() {
    return this.pengembalianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengembalianService.findOne(+id);
  }

  @Get('peminjaman/:peminjamanId')
  findByPeminjaman(@Param('peminjamanId') peminjamanId: string) {
    return this.pengembalianService.findByPeminjaman(+peminjamanId);
  }
}
