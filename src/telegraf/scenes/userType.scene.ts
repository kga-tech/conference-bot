import { BOT_INFORMATION_SCENE, BOT_USERTYPE_SCENE, sessionConstants } from "../sceneConstants/telegraf.constants";
import { Hears, Scene, SceneEnter } from "nestjs-telegraf";
import { MyContext } from "../interfaces/context.interface";
import { ObjectType } from "../interfaces/context.interface";
import { Markup } from "telegraf";
import { MongodbService } from "src/mongodb/mongodb.service";





@Scene(BOT_USERTYPE_SCENE)
export class BotUserTypeScene {

    constructor(private readonly mongoService: MongodbService) { }

    @SceneEnter()
    async onSceneEnter(context: MyContext): Promise<void> {

        const name: string = (await this.mongoService.findName(context.from.id)).name;
        await context.reply(`${name},\nРасскажи, в качестве кого ты выступаешь:`, Markup.keyboard(['Рекламодатель', 'Партнерская сеть', 'Media-buyer', 'Owner команды', 'Другое']).resize(true).oneTime());

    }

    @Hears('Рекламодатель')
    async onHearsAdvertiser(context: MyContext): Promise<void> {
        await this.mongoService.updateUserType(context.from.id, ObjectType.Advertiser);
        await context.scene.enter(BOT_INFORMATION_SCENE);
    }

    @Hears('Партнерская сеть')
    async onHearsCPA(context: MyContext): Promise<void> {
        await this.mongoService.updateUserType(context.from.id, ObjectType.CPA_NETWORK);
        await context.scene.enter(BOT_INFORMATION_SCENE);
    }

    @Hears('Media-buyer')
    async onHearsMediaBuyer(context: MyContext): Promise<void> {
        await this.mongoService.updateUserType(context.from.id, ObjectType.Buyer);
        await context.scene.enter(BOT_INFORMATION_SCENE);
    }
    @Hears('Owner команды')
    async onHearsOwner(context: MyContext): Promise<void> {
        await this.mongoService.updateUserType(context.from.id, ObjectType.Owner);
        await context.scene.enter(BOT_INFORMATION_SCENE);
    }
    @Hears('Другое')
    async onHearsMisc(context: MyContext): Promise<void> {
        await this.mongoService.updateUserType(context.from.id, ObjectType.Misc);
        await context.scene.enter(BOT_INFORMATION_SCENE);
    }

}