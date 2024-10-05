import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameInviterEntity } from './game-inviter.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'game-inviter-players' })
export class GameInviterPlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'int' })
  userId: string;

  @Column({ type: 'varchar' })
  gameInviterId: number;

  @ManyToOne(() => GameInviterEntity, (inviter) => inviter.players)
  gameInviter: GameInviterEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
