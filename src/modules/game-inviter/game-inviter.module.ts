import { Module } from '@nestjs/common';
import { GameInviterController } from './game-inviter.controller';
import { GameInviterService } from './game-inviter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameInviterEntity } from './entities/game-inviter.entity';
import { GameInviterPlayerEntity } from './entities/game-inviter-player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameInviterEntity, GameInviterPlayerEntity]),
  ],
  controllers: [GameInviterController],
  providers: [GameInviterService],
})
export class GameInviterModule {}
