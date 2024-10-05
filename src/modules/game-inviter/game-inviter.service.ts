import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameInviterEntity } from './entities/game-inviter.entity';
import { CreateGameInviterDto } from './dto/create-game-inviter.dto';
import { GameInviterDto } from './dto/game-inviter.dto';
import { GameInviterPlayerEntity } from './entities/game-inviter-player.entity';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class GameInviterService {
  constructor(
    @InjectRepository(GameInviterEntity)
    private readonly gameInviterRepository: Repository<GameInviterEntity>,

    @InjectRepository(GameInviterPlayerEntity)
    private readonly gameInviterPlayerRepository: Repository<GameInviterPlayerEntity>,
  ) {}

  async create(dto: CreateGameInviterDto) {
    let entity = new GameInviterEntity();
    entity.name = dto.name;
    entity.isActive = true;
    entity.ownerId = dto.userId;
    entity = await this.gameInviterRepository.save(entity);

    await this.joinToGameInviter(dto.userId, entity.id);
    return new GameInviterDto(entity);
  }

  async getById(gameId: number) {
    const entity = await this.gameInviterRepository.findOne({
      where: { id: gameId },
    });

    const players = await this.getAllPlayers(gameId);
    return new GameInviterDto(entity, players);
  }

  async getAllActive() {
    const all = await this.gameInviterRepository.find();
    return all.map((entity) => new GameInviterDto(entity));
  }

  async makeGameInviterInactive(gameInviterId: number) {
    await this.gameInviterRepository.update(
      { id: gameInviterId },
      { isActive: false },
    );
  }

  async joinToGameInviter(userId: string, gameId: number) {
    const entity = new GameInviterPlayerEntity();
    entity.gameInviterId = gameId;
    entity.userId = userId;
    await this.gameInviterPlayerRepository.save(entity);
  }

  async leaveGameInviter(userId: string, gameId: number) {
    await this.gameInviterPlayerRepository.delete({
      userId,
      gameInviterId: gameId,
    });
  }

  async getAllPlayers(gameId: number) {
    const entities = await this.gameInviterPlayerRepository.find({
      where: { gameInviterId: gameId },
      relations: ['user'],
    });

    const userEntities = entities.map((entity) => entity.user);
    return userEntities.map((entity) => new UserDto(entity));
  }
}
