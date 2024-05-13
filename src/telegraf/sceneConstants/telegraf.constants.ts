import { IBotParams } from "../interfaces/params.interface"

export const BOT_ENTRANCE_SCENE: string = 'BOT_ENTRANCE_SCENE';
export const BOT_INFORMATION_SCENE: string = 'BOT_INFORMATION_SCENE';
export const BOT_USERTYPE_SCENE: string = 'BOT_USERTYPE_SCENE';
export const BOT_REASON_SCENE: string = 'BOT_REASON_SCENE';

export let sessionConstants: IBotParams = {
    name: '',
    UserType: null,
    description: '',
}