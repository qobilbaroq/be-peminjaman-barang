import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';

@Controller('alat')
export class AlatController {
  constructor(private readonly alatService: AlatService) {}

  @Post()
  create(@Body() createAlatDto: CreateAlatDto) {
    return this.alatService.create(createAlatDto);
  }

  @Get()
  findAll() {
    return this.alatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlatDto: UpdateAlatDto) {
    return this.alatService.update(+id, updateAlatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alatService.remove(+id);
  }
}
