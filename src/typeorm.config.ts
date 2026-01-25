import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'app_user',
  password: '12345',
  database: 'peminjaman_db',
  autoLoadEntities: true,
  synchronize: true,
};
