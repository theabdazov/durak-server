import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardSuit } from '../../../interfaces/game';

export enum GameStatus {
  active = 'active',
  completed = 'completed',
  abandoned = 'abandoned',
}

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.active,
  })
  status: GameStatus;

  @Column({ type: 'bigint', nullable: false })
  ownerId: number;

  @Column({ type: 'varchar', nullable: false })
  trumpSuit: CardSuit;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
