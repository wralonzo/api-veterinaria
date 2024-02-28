import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Pet } from './pet.entity';
import { Product } from './product.entity';

@Entity()
export class ServicePet {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'route', length: 50 })
  route: string;

  @Column('int', { name: 'pet' })
  idPet: number;

  @Column('int', { name: 'product' })
  idProduct: number;

  @Column('double', { name: 'dose' })
  dose: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column('int', { name: 'user_register' })
  idUserRegister: number;

  @CreateDateColumn({ type: 'datetime',   })
  dateCreated: Date;

  @ManyToOne(() => Pet, (pet) => pet.serivicePetFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'pet', referencedColumnName: 'id' }])
  serivicePetFk: Pet;

  @ManyToOne(() => Product, (pet) => pet.productFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'product', referencedColumnName: 'id' }])
  productFk: Product;

  @ManyToOne(() => User, (user) => user.serviceRegisterFk, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_register', referencedColumnName: 'id' }])
  serviceRegisterFk: User;
}
