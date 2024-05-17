import { MongodbService } from "src/mongodb/mongodb.service";
import { BOT_ENTRANCE_SCENE, BOT_REASON_SCENE } from "../sceneConstants/telegraf.constants";
import { Scene, Hears, SceneEnter } from "nestjs-telegraf";
import { MyContext, ReasonType } from "../interfaces/context.interface";
import { Markup } from "telegraf";




@Scene(BOT_REASON_SCENE)
export class BotReasonScene {

    constructor(private readonly mongoService: MongodbService) { }


    @SceneEnter()
    async onSceneEnter(context: MyContext): Promise<void> {
        const message = `Поздравляем 🎉\n\nТы попал к ТОПам арбитражного рынка\\.\n\nБудем рады выслушать твои предложения о сотрудничестве\\.\nВыбери опцию ниже⬇️\n\n👥 Хочешь попасть на личную встречу с овнером прямо сейчас? Жми \\- _*Хочу на личную встречу*_\n\n🌐Хочешь узнать больше о нашей команде: источниках, вертикалях и доступных вакансиях? Жми \\- _*Хочу перейти на сайт*_\n\n📨Также ты можешь просто оставить свои контактные данные, и мы свяжемся с тобой в ближайшее время\\. Для этого жми \\- _*Хочу связаться позже*_`; 

        await context.reply(message, { parse_mode: 'MarkdownV2', reply_markup: { 
            keyboard: [
                ["Хочу получить личную встречу"],
                ["Хочу перейти на сайт"],
                ["Хочу связаться позже"],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
        });

        if(await this.mongoService.findSession(context.from.id) !== null) { 
            await this.mongoService.updateSession(context.from.id, context.message?.from?.username);
        } else {
            await this.mongoService.createSession(context.from.id, context.message?.from?.username);
        }
    }

    @Hears('Хочу связаться позже')
    async OnHearsContacts(context: MyContext) {

        await this.mongoService.updateReason(context.from.id, ReasonType.Contacts);
        await context.scene.enter(BOT_ENTRANCE_SCENE);
    }

    @Hears('Хочу получить личную встречу')
    async onHearsOwnerMeet(context: MyContext) {
        await this.mongoService.updateReason(context.from.id, ReasonType.Local);
        await context.scene.enter(BOT_ENTRANCE_SCENE);
    }

    @Hears('Хочу перейти на сайт')
    async onHearsSite(context: MyContext) {
        await context.reply('Наш сайт доступен по ссылке ниже:\nhttps://lidera.agency');
    }

}