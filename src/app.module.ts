import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GameModule } from './modules/game/game.module';
import { UserModule } from './modules/user/user.module';
import { TelegramBotService } from './telegram-bot.service';
import { GameEntity } from './modules/game/entities/game.entity';
import { UserEntity } from './modules/user/entities/user.entity';
import { GameStateEntity } from './modules/game/entities/game-state.entity';
import { GameCardEntity } from './modules/game/entities/game-card.entity';
import { GamePlayersEntity } from './modules/game/entities/game-players.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          GameEntity,
          GameStateEntity,
          GameCardEntity,
          GamePlayersEntity,
          UserEntity,
        ],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    GameModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramBotService],
})
export class AppModule {}
