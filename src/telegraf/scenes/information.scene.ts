import { BOT_INFORMATION_SCENE, sessionConstants } from "../sceneConstants/telegraf.constants";
import { On, Scene, SceneEnter } from "nestjs-telegraf";
import { MyContext } from "../interfaces/context.interface";
import { deunionize } from "telegraf";
import { MongodbService } from "src/mongodb/mongodb.service";






@Scene(BOT_INFORMATION_SCENE)
export class BotInformationScene {

    constructor(private readonly mongoService: MongodbService) { }

    @SceneEnter()
    async onSceneEnter(context: MyContext): Promise<void> {
        await context.reply("Расскажите о себе(Чем занимаешься/Что предлагаешь)");
    }

    @On('text')
    async onUserMessage(context: MyContext): Promise<void> {
        
        

        const description = await deunionize(context.message).text;

        await this.mongoService.updateDescription(context.from.id, description);

        await context.reply('Спасибо за отклик!\nСкоро мы свяжемся с тобой...');
        await context.reply('Пока ты можешь ознакомиться с нашим сайтом: https://lidera.agency');

    }

}