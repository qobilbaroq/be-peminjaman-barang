import { Module } from '@nestjs/common';
import { AlatService } from './alat.service';
import { AlatController } from './alat.controller';

@Module({
  controllers: [AlatController],
  providers: [AlatService],
})
export class AlatModule {}
