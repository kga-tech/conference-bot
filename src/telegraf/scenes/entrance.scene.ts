import { BOT_ENTRANCE_SCENE, BOT_USERTYPE_SCENE, sessionConstants } from "../sceneConstants/telegraf.constants";
import { MyContext } from "../interfaces/context.interface";
import { On, Scene, SceneEnter } from "nestjs-telegraf";
import { deunionize } from "telegraf";
import { MongodbService } from "src/mongodb/mongodb.service";





@Scene(BOT_ENTRANCE_SCENE)
export class BotEntranceScene {

    constructor(private readonly mongoService: MongodbService) { }

    @SceneEnter()
    async onSceneEnter(context: MyContext): Promise<void> {

        const username = (await this.mongoService.findSession(context.from?.id))?.username
        await context.reply(`${username !== null ? username : context.message?.from?.username}\nПожалуйста напиши своё имя (Название компании)`);
        
    }


    @On('text')
    async OnTextInformation(context: MyContext): Promise<void> {

        console.log('we are here')

        const name: string = await deunionize(context.message).text;

        await this.mongoService.updateName(context.from.id, name);

        await context.scene.enter(BOT_USERTYPE_SCENE)

    }

    


}