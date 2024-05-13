import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { google } from "googleapis";
import { MongodbService } from "./mongodb.service";
import { Information } from "./information.schema";
import { asyncForEach } from "sequential-async-foreach";

interface UploadingObject {
    Name: string;
    User: string;
    Description: string;
    Reason: string;
    Telegram: string;
}


@Injectable()
export class SpreadSheetService {

    constructor(
        private readonly configService: ConfigService,
        private readonly mongoService: MongodbService,
    ) { }

    

    async UploadInformation(): Promise<void> {

        const data = await this.mongoService.getAllInformation();
        let result = [];
        

        await asyncForEach(await data, async(item: Information) => {
            const uploadingObject: UploadingObject = {
                Name: item.name,
                User: item.userType,
                Description: item.description,
                Reason: item.reason,
                Telegram: item.username
            }

            result.push(uploadingObject);
        })

        const authClient = new google.auth.JWT({
            email: this.configService.get<string>('GOOGLE_SERVICE_ACCOUT'),
            key: this.configService.get<string>('GOOGLE_PRIVATE_KEY').split(String.raw`\n`).join('\n'),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            subject: this.configService.get<string>('GOOGLE_SERVICE_ACCOUT')
        })

        const doc = new GoogleSpreadsheet(this.configService.get<string>("GOOGLE_SPREADSHEET"), authClient);
        await doc.loadInfo();


        const sheet = doc.sheetsByTitle['Conference'];
        await sheet.clear('A2:E');
        await sheet.addRows(result);
    }


}

