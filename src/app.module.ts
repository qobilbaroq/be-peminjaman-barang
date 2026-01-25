import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { AlatModule } from './modules/alat/alat.module';
import { PeminjamanModule } from './modules/peminjaman/peminjaman.module';
import { PengembalianModule } from './modules/pengembalian/pengembalian.module';
import { LogAktifitasModule } from './modules/log-aktifitas/log-aktifitas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CategoryModule,
    AlatModule,
    PeminjamanModule,
    PengembalianModule,
    LogAktifitasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
