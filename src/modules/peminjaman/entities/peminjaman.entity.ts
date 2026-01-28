import { Alat } from 'src/modules/alat/entities/alat.entity';
import { Pengembalian } from 'src/modules/pengembalian/entities/pengembalian.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

export enum PeminjamanStatus{
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    RETURNED = 'returned'
}

@Entity('peminjaman')
export class Peminjaman {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id'})
    userId: number;

    @Column({ name: 'petugas_id', nullable: true})
    petugasId: number;

    @Column({ type: 'date', name: 'tanggal_pinjam'})
    tanggalPinjam: Date;

    @Column({ type: 'date', name: 'tanggal_kembali'})
    tanggalKembali: Date;

    @Column({
        type: 'enum',
        enum: PeminjamanStatus,
        default:PeminjamanStatus.PENDING
    })
    status: PeminjamanStatus;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.peminjaman, {
        onDelete: 'CASCADE',
    })

    @JoinColumn({ name: 'user_id'})
    user: User;

    @ManyToOne(() => User, (user) => user.petugasPeminjaman, {
        onDelete: 'SET NULL',
    })

    @JoinColumn({ name: 'petugas_id'})
    petugas: User;

    @ManyToOne(() => Alat, (alat) => alat.peminjaman, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'alat_id' })
    alat: Alat;

    @OneToOne(() => Pengembalian, (pengembalian) => pengembalian.peminjaman)
    pengembalian: Pengembalian;
}
