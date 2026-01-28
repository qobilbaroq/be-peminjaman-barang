import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('log_aktifitas')
export class LogAktifita {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column()
    action: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.logAktifitas, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;
}