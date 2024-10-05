import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game_players' })
export class GamePlayersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  gameId: number;

  @Column({ type: 'int' })
  playerOrder: number;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isAttacker: boolean;

  @Column({ type: 'boolean', default: false })
  isDefender: boolean;

  @Column({ type: 'boolean', default: false })
  pass: boolean;
}
