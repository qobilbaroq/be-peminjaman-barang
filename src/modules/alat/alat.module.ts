import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlatController } from './alat.controller';
import { AlatService } from './alat.service';
import { Alat } from './entities/alat.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alat, Category])],
  controllers: [AlatController],
  providers: [AlatService],
  exports: [AlatService],
})
export class AlatModule {}