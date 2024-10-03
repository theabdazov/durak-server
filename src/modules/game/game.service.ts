import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly repository: Repository<GameEntity>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<GameDto> {
  }

}
