import { LogAktifita } from '../../log-aktifitas/entities/log-aktifita.entity';
import { Peminjaman } from 'src/modules/peminjaman/entities/peminjaman.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    PETUGAS = 'petugas',
    PEMINJAM = 'peminjam',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PEMINJAM,
    })
    role: UserRole;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => Peminjaman, (peminjaman) => peminjaman.user)
    peminjaman: Peminjaman[];

    @OneToMany(() => Peminjaman, (peminjaman) => peminjaman.petugas)
    petugasPeminjaman: Peminjaman[];

    @OneToMany(() => LogAktifita, (logAktifita) => logAktifita.user)
    logAktifitas: LogAktifita[]; 
}
