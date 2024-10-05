import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameInviterService } from './game-inviter.service';
import { CreateGameInviterDto } from './dto/create-game-inviter.dto';
import { UserId } from '../../decorators';

@Controller('game-inviter')
export class GameInviterController {
  constructor(private gameInviterService: GameInviterService) {}

  @Post()
  async create(
    @Body() createDto: CreateGameInviterDto,
    @UserId() userId: string,
  ) {
    return this.gameInviterService.create({ ...createDto, userId });
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.gameInviterService.getById(id);
  }

  @Get()
  async getAll() {
    return this.gameInviterService.getAllActive();
  }

  @Get('/:id/join')
  async join(@Param('id') id: number, @UserId() userId: string) {
    return this.gameInviterService.joinToGameInviter(userId, id);
  }

  @Get('/:id/leave')
  async leave(@Param('id') id: number, @UserId() userId: string) {
    return this.gameInviterService.leaveGameInviter(userId, id);
  }

  @Get('/:id/remove/:player')
  async removePlayer(@Param('id') id: number, @Param('player') player: string) {
    return this.gameInviterService.leaveGameInviter(player, id);
  }

  @Get('/:id/players')
  async players(@Param('id') id: number) {
    return this.gameInviterService.getAllPlayers(id);
  }
}
