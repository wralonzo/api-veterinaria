import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column({
    name: 'expired_date',
  })
  expiredDate: Date;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @CreateDateColumn({ type: 'datetime' })
  dateCreated: Date;
}
