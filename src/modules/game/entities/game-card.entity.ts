import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GameCardLocation {
  deck = 'deck',
  hand = 'hand',
  table = 'table',
  discard = 'discard',
}

@Entity({ name: 'game-cards' })
export class GameCardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int' })
  order: number;

  @Column({
    type: 'enum',
    enum: GameCardLocation,
    default: GameCardLocation.deck,
  })
  location: GameCardLocation;

  @Column({ type: 'int', nullable: true })
  playerId: number;

  @Column({ type: 'int', nullable: false })
  gameId: number;
}
