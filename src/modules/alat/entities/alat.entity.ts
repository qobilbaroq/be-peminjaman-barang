import { Category } from 'src/modules/category/entities/category.entity';
import { Peminjaman } from 'src/modules/peminjaman/entities/peminjaman.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';

export enum AlatStatus {
    AVAILABLE = 'available',
    BORROWED = 'borrowed',
    MAINTENANCE = 'maintenance',
}

@Entity('alats')
export class Alat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'category_id'})
    categoryId: number;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({
        type: 'enum',
        enum: AlatStatus,
        default: AlatStatus.AVAILABLE,
    })
    status: AlatStatus;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.alats, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @OneToMany(() => Peminjaman, (peminjaman) => peminjaman.alat)
    peminjaman: Peminjaman[];
}

