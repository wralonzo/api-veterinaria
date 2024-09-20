import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Consult } from './consult.entity';
import { ServicePet } from './service-pet';
import { VaccinePet } from './vaccine-pet';
import { Client } from './client.entity';
import { EnumTypePet } from '@/shared/enum/type-pet.enum';
import { Examen } from './examen.entity';
import { Reservation } from './reservation.entity';
import { Constancy } from './contancy.entity';

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'name', length: 100 })
  description: string;

  @Column('int', { name: 'id_pet' })
  idPet: number;

  @Column('int', { name: 'user' })
  idUser: number;

  @CreateDateColumn({ type: 'datetime' })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
