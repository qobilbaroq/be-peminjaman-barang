import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Peminjaman } from '../../peminjaman/entities/peminjaman.entity';

@Entity('pengembalian')
export class Pengembalian {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ name: 'peminjaman_id'})
    peminjamanId: number;

    @Column({ type: 'date', name: 'tanggal_kembali'})
    tanggalKembali: Date;
    
    @Column({ type: 'decimal', precision: 10, scale: 2, name: 'denda' })
    denda:number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
    
    @OneToOne(() => Peminjaman, (peminjaman) => peminjaman.pengembalian, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'peminjaman_id' })
    peminjaman: Peminjaman;
}
