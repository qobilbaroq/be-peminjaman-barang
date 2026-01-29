import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogAktifita } from './entities/log-aktifita.entity';

@Injectable()
export class LogAktifitasService {
  constructor(
    @InjectRepository(LogAktifita)
    private logAktifitasRepository: Repository<LogAktifita>,
  ) {}

  async create(
    userId: number,
    action: string,
    description: string,
  ): Promise<LogAktifita> {
    const log = this.logAktifitasRepository.create({
      userId,
      action,
      description,
    });

    return await this.logAktifitasRepository.save(log);
  }

  async findAll(userId?: number, limit: number = 100): Promise<LogAktifita[]> {
    const queryBuilder = this.logAktifitasRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user')
      .orderBy('log.createdAt', 'DESC')
      .limit(limit);

    if (userId) {
      queryBuilder.where('log.userId = :userId', { userId });
    }

    return await queryBuilder.getMany();
  }

  async findByAction(action: string): Promise<LogAktifita[]> {
    return await this.logAktifitasRepository.find({
      where: { action },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number, limit: number = 50): Promise<LogAktifita[]> {
    return await this.logAktifitasRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
