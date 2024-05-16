import { BOT_ENTRANCE_SCENE, BOT_INFORMATION_SCENE, BOT_REASON_SCENE, sessionConstants } from "../sceneConstants/telegraf.constants";
import { Hears, On, Scene, SceneEnter, SceneLeave } from "nestjs-telegraf";
import { MyContext } from "../interfaces/context.interface";
import { Markup, deunionize } from "telegraf";
import { MongodbService } from "src/mongodb/mongodb.service";






@Scene(BOT_INFORMATION_SCENE)
export class BotInformationScene {

    constructor(private readonly mongoService: MongodbService) { }

    @SceneEnter()
    async onSceneEnter(context: MyContext): Promise<void> {
        await context.reply("Расскажите о себе: чем ты занимаешься / что предлагаешь?");
    }

    @Hears('Изменить данные')
    async onHearsChangeData(context: MyContext) {
        await context.scene.enter(BOT_REASON_SCENE);
    }
    @On('text')
    async onUserMessage(context: MyContext): Promise<void> {
        
        

        const description = await deunionize(context.message).text;

        await this.mongoService.updateDescription(context.from.id, description);
        
        await context.reply('Спасибо!\nНам потребуется немного времени, чтобы обработать  запрос.\nЕсли твое предложение нас заинтересует, мы с тобой свяжемся🤝');
        await context.reply('А пока что, ты можешь узнать о нас больше на сайте: https://lidera.agency');
        await context.reply(`Если нужно изменить данные, нажми кнопку ниже`, Markup.keyboard(['Изменить данные']).resize(true).oneTime());

    }

}