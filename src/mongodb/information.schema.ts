import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { ObjectType } from 'src/telegraf/interfaces/context.interface';

export type InformationDocument = Information & Document;


@Schema()
export class Information {

    @Prop({ required: true })
    user_id: number;

    @Prop({ required: true, default: '' })
    username: string;

    @Prop({ default: '', required: false })
    name: string;

    @Prop({ default: '', required: false })
    userType: string;

    @Prop({ default: '', required: false })
    description: string;

}

export const InformationSchema = SchemaFactory.createForClass(Information);