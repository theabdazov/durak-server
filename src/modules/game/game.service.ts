import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity, GameStatus } from './entities/game.entity';
import { GamePlayersEntity } from './entities/game-players.entity';
import { GameCardEntity, GameCardLocation } from './entities/game-card.entity';
import { GameStateEntity } from './entities/game-state.entity';
import { Card, CardSuit } from '../../interfaces/game';
import { DECK } from '../../constants/deck';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    @InjectRepository(GamePlayersEntity)
    private playerRepository: Repository<GamePlayersEntity>,
    @InjectRepository(GameCardEntity)
    private cardRepository: Repository<GameCardEntity>,
    @InjectRepository(GameStateEntity)
    private gameStateRepository: Repository<GameStateEntity>,
  ) {}

  async createGame(
    creatorId: number,
    playerIds: number[],
  ): Promise<GameEntity> {
    const [deck, trump] = this.getDeckAndTrump();
    const game = this.gameRepository.create({
      status: GameStatus.active,
      trumpSuit: trump,
      ownerId: creatorId,
    });
    await this.gameRepository.save(game);

    const players = playerIds.map((userId, index) =>
      this.playerRepository.create({
        gameId: game.id,
        userId: userId,
        playerOrder: index + 1,
      }),
    );
    await this.playerRepository.save(players);

    const cards = deck.map((card, index) =>
      this.cardRepository.create({
        gameId: game.id,
        name: card,
        location: GameCardLocation.deck,
        order: index + 1,
      }),
    );
    await this.cardRepository.save(cards);

    const gameState = this.gameStateRepository.create({
      gameId: game.id,
      tableCards: [],
    });
    await this.gameStateRepository.save(gameState);

    await this.dealInitialHands(game.id);

    return game;
  }

  private getDeckAndTrump(): [Card[], CardSuit] {
    const deck = this.shuffleDeck(DECK);
    const lastCard = deck[deck.length - 1];
    const trump = lastCard[lastCard.length - 1] as CardSuit;
    return [deck, trump];
  }

  private shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  async dealInitialHands(gameId: number): Promise<void> {
    const players = await this.playerRepository.find({
      where: { gameId },
      order: { playerOrder: 'ASC' },
    });
    const cardsPerPlayer = 6;

    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < cardsPerPlayer; j++) {
        const card = await this.cardRepository.findOne({
          where: { gameId: gameId, location: GameCardLocation.deck },
          order: { order: 'ASC' },
        });

        if (card) {
          card.location = GameCardLocation.hand;
          card.playerId = players[i].userId;
          await this.cardRepository.save(card);
        }
      }
    }

    await this.playerRepository.update(
      { gameId: gameId, userId: players[0].userId },
      { isActive: true, isAttacker: true },
    );

    await this.playerRepository.update(
      { gameId: gameId, userId: players[1].userId },
      { isDefender: true },
    );

    await this.playerRepository.update(
      { gameId: gameId, userId: players[2].userId },
      { isAttacker: true },
    );
  }
}
