import { Ctx, Start, Update } from 'nestjs-telegraf'
import { MyContext } from './interfaces/context.interface';
import { BOT_REASON_SCENE } from './sceneConstants/telegraf.constants';


@Update()
export class TelegrafBotService {

    @Start()
    async OnBotStart(@Ctx() context: MyContext): Promise<void> {
        await context.scene.enter(BOT_REASON_SCENE);
    }
}