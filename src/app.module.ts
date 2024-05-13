import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafBotModule } from './telegraf/telegraf.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION_STRING'),
        useNewUrlParser: true
      }),
      inject: [ConfigService],
    }),

    TelegrafBotModule,
    MongodbModule
  ],
})
export class AppModule {}
