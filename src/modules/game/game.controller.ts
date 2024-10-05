import { Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GameDto } from './dto/game.dto';

@ApiTags('Banner Public')
@Controller('banner')
export class GameController {
  constructor(private readonly bannerService: GameService) {}

  @Get()
  @ApiOkResponse({ type: [GameDto] })
  findAll() {
    return 'hello'
  }
}
