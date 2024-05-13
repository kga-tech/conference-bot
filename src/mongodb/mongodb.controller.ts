import { Controller, Get } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { Information } from './information.schema';

@Controller('mongodb')
export class MongodbController {

    constructor(private readonly mongoService: MongodbService) { }


    @Get()
    async getAllInformation(): Promise<Information[]> {
        return await this.mongoService.getAllInformation();
    }
 
}
