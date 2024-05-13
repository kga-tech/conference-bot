import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TelegrafModule } from "nestjs-telegraf";
import { sessionMiddleware } from "./middleware/session.middleware";
import { TelegrafBotService } from "./telegraf.service";


import { MongooseModule } from "@nestjs/mongoose";
import { InformationSchema, Information } from "src/mongodb/information.schema";

// ================================== || SCENES || ================================== //
import { BotEntranceScene } from "./scenes/entrance.scene";
import { BotUserTypeScene } from "./scenes/userType.scene";
import { BotInformationScene } from "./scenes/information.scene";
import { MongodbService } from "src/mongodb/mongodb.service";






@Module({
    imports: [
        MongooseModule.forFeature([{name: Information.name, schema: InformationSchema}]),
        TelegrafModule.forRootAsync({

            botName: "lideramac_bot",
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
                middlewares: [sessionMiddleware],
                options: {
                    handlerTimeout: 600,
                }
            })
        })
    ],
    providers: [
        TelegrafBotService,
        MongodbService,
        
        BotEntranceScene,
        BotUserTypeScene,
        BotInformationScene
    ],
})

export class TelegrafBotModule { }