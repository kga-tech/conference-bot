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

        await context.reply(`Привет!\nВыбери опцию ниже`, Markup.keyboard([['Хочу оставить свои контакты', 'Хочу получить личную встречу с овнером'], ["Хочу перейти на сайт"]]).oneTime());

        if(await this.mongoService.findSession(context.from.id) !== null) { 
            await this.mongoService.updateSession(context.from.id, context.message?.from?.username);
        } else {
            await this.mongoService.createSession(context.from.id, context.message?.from?.username);
        }
    }

    @Hears('Хочу оставить свои контакты')
    async OnHearsContacts(context: MyContext) {

        await this.mongoService.updateReason(context.from.id, ReasonType.Contacts);
        await context.scene.enter(BOT_ENTRANCE_SCENE);
    }

    @Hears('Хочу получить личную встречу с овнером')
    async onHearsOwnerMeet(context: MyContext) {
        await this.mongoService.updateReason(context.from.id, ReasonType.Local);
        await context.scene.enter(BOT_ENTRANCE_SCENE);
    }

    @Hears('Хочу перейти на сайт')
    async onHearsSite(context: MyContext) {
        await context.reply('Наш сайт доступен по ссылке ниже:\nhttps://lidera.agency');
    }

}