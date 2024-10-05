import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameCardEntity } from './entities/game-card.entity';
import { GameStateEntity } from './entities/game-state.entity';
import { GamePlayersEntity } from './entities/game-players.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameEntity,
      GameCardEntity,
      GameStateEntity,
      GamePlayersEntity,
    ]),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
