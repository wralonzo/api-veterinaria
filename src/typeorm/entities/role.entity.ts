import { EnumState } from '@/shared/enum/state.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { RoleUser } from './role-user-entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'key', length: 50 })
  key: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => RoleUser, (role) => role.userRoleFk)
  userRoleFk: RoleUser[];
}
