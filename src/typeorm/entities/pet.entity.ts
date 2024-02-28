import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
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

@Entity()
export class Pet {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { name: 'gender', length: 10 })
  gender: 'Macho' | 'Hembra';

  @Column('int', { name: 'client' })
  client: number;

  @Column('int', { name: 'user' })
  idUser: number;

  @Column('varchar', { name: 'race', length: 50 })
  race: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @CreateDateColumn({ type: 'datetime' })
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.petFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user', referencedColumnName: 'id' }])
  petFk: User;

  @ManyToOne(() => Client, (client) => client.clientFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'client', referencedColumnName: 'id' }])
  clientPetFk: Client;

  @OneToMany(() => Consult, (consult) => consult.consultsFk)
  consultsFk: Consult[];

  @OneToMany(() => ServicePet, (serivicePet) => serivicePet.serivicePetFk)
  serivicePetFk: ServicePet[];

  @OneToMany(() => VaccinePet, (vaccinePet) => vaccinePet.vaccinePetFk)
  vaccinePetFk: VaccinePet[];
}
