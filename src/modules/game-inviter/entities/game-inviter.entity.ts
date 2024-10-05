import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameInviterPlayerEntity } from './game-inviter-player.entity';

@Entity({ name: 'game-inviter' })
export class GameInviterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'bigint' })
  ownerId: string;

  @OneToMany(() => GameInviterPlayerEntity, (player) => player.gameInviter)
  players: GameInviterPlayerEntity[];
}
