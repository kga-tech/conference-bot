import { Scenes, Context } from 'telegraf'
import { SceneContext, SceneSession } from 'telegraf/typings/scenes';


export interface IBotParams {
    name: string;
    UserType: ObjectType | null;
    description: string;
}

export enum ObjectType {
    Advertiser = "Рекламодатель",
    CPA_NETWORK = "CPA",
    Buyer = "Mediabuyer",
    Owner = "Владелец арбитражной команды",
    Misc = "Другое",
}

interface MySceneSession extends Scenes.SceneSessionData {
    mySceneSessionProps: IBotParams;
}

export interface MySession extends Scenes.SceneSession<MySceneSession> {
    mySessionProps: IBotParams;
}

export interface MyContext extends Context {
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MySceneSession>
}
