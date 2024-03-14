import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServicePet } from './service-pet';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('double', { name: 'price' })
  price: number;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column('double', { name: 'quantity' })
  quantity: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column({ name: 'date_expired', nullable: true })
  dateExpired: Date;

  @CreateDateColumn({ type: 'datetime',   })
  dateCreated: Date;

  @OneToMany(() => ServicePet, (serivicePet) => serivicePet.productFk)
  productFk: ServicePet[];
}
