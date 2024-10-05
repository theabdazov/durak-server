import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context, Markup } from 'telegraf';
import { UserService } from './modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.initBot();
  }

  private initBot() {
    this.bot = new Telegraf('7734357934:AAGQ7mrsAmhwvuDrqCmsYbB_0OBBJi8HzaY');

    // Register command and message listeners
    this.bot.start(async (ctx: Context) => {
      await ctx.reply('Ботко кош келеиниз');
      await ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.inlineKeyboard([
          Markup.button.webApp(
            'Онлайн дурак',
            this.configService.get<string>('MINI_APP_URL'),
          ),
        ]),
      );
      await this.userService.create(
        ctx.from.id.toString(),
        ctx.from.first_name + ' ' + ctx.from.last_name,
      );
    });
    this.bot.hears('hello', (ctx) => ctx.reply('Hello there!'));

    // Additional listeners (for generic text messages)
    this.bot.on('text', (ctx) => {
      this.handleIncomingMessage(ctx.message.text, ctx);
    });

    // Start bot
    this.bot.launch();
    console.log('Telegram bot started');
  }

  private handleIncomingMessage(message: string, ctx: any) {
    console.log('Received message:', message);
    ctx.reply('You sent: ' + message);
  }

  // Optionally: Function to send messages from other parts of your app
  public sendMessage(chatId: number, text: string) {
    this.bot.telegram.sendMessage(chatId, text);
  }
}
