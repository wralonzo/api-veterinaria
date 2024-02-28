import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Consult {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column('int', { name: 'user' })
  idUser: number;

  @Column('int', { name: 'pet' })
  pet: number;

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

  @ManyToOne(() => Pet, (pet) => pet.consultsFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'pet', referencedColumnName: 'id' }])
  consultsFk: Pet;
}
