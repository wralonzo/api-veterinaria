import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AppUser } from './app-user-entity';

@Entity()
export class App {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'route', length: 50 })
  route: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @DeleteDateColumn()
  deletedAt?: Date;
  
  @OneToMany(() => AppUser, (app) => app.userAppFk)
  appUserFk: AppUser[];
}
