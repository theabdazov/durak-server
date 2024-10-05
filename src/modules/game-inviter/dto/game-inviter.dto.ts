import { ApiProperty } from '@nestjs/swagger';
import { GameInviterEntity } from '../entities/game-inviter.entity';
import { UserDto } from '../../user/dto/user.dto';

export class GameInviterDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  players: UserDto[];

  @ApiProperty()
  ownerId: string;

  constructor(entity: GameInviterEntity, players: UserDto[] = []) {
    this.id = entity.id;
    this.name = entity.name;
    this.isActive = entity.isActive;
    this.createdAt = entity.createdAt;
    this.ownerId = entity.ownerId;
    this.players = players;
  }
}
