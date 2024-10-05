import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from '../../../interfaces/game';

export interface TableCards {
  attacker: Card;
  defender: Card;
}

@Entity({ name: 'game-cards' })
export class GameStateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  gameId: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  tableCards: TableCards;
}
