import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Information, InformationDocument } from './information.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongodbService {

    constructor(@InjectModel(Information.name) private readonly Model: Model<InformationDocument>) { }


    async findSession(sessionId: number): Promise<Information> {
        return await this.Model.findOne({ user_id: sessionId })
        .select("-__v")
        .select("-_id");
    }

    async createSession(sessionID: number, _username: string): Promise<Information> {
        return await this.Model.create({ user_id: sessionID, username: _username });
    }

    async updateSession(sessionID: number, _username: string): Promise<Information> {
        return await this.Model.findOneAndUpdate({ user_id: sessionID }, { username: _username });
    }

    async updateName(sessionID: number, name: string): Promise<Information> {
        return await this.Model.findOneAndUpdate({ user_id: sessionID }, { name: name });
    }

    async findName(sessionID: number): Promise<Information> {
        return await this.Model.findOne({user_id: sessionID});
    }
    
    async getAllInformation(): Promise<Information[]> {
        return await this.Model.find();
    }

    async updateUserType(sessionID: number, _userType: string): Promise<Information> {
        return await this.Model.findOneAndUpdate({user_id: sessionID}, { userType: _userType });
    }

    async updateDescription(sessionID: number, _description: string): Promise<Information> {
        return await this.Model.findOneAndUpdate({user_id: sessionID}, { description: _description });
    }

    async updateReason(sessionID: number, _reason: string): Promise<Information> {
        return await this.Model.findOneAndUpdate({user_id: sessionID}, { reason: _reason });
    }

    async deleteRecord(ObjectId): Promise<void> {
        return await this.Model.findByIdAndDelete({ _id: ObjectId })
    }

}
