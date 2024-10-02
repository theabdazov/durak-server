import { ApiProperty } from '@nestjs/swagger';
import { GameEntity, GameStatus } from '../entities/game.entity';

export class GameDto {
  private readonly id: number;
  @ApiProperty()
  private readonly name: string;
  @ApiProperty()
  private readonly ownerId: number;
  @ApiProperty()
  private readonly status: GameStatus;

  constructor(game: GameEntity) {
    this.id = game.id;
    this.name = game.name;
    this.status = game.status;
    this.ownerId = game.ownerId;
  }
}

export const BannerDtoMapper = (banner: GameEntity) => new GameDto(banner);
