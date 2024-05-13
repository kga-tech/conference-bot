import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { Information } from './information.schema';
import { SpreadSheetService } from './spreadsheet.service';

@Controller('mongodb')
export class MongodbController {

    constructor(
        private readonly mongoService: MongodbService,
        private readonly SpreadsheetService: SpreadSheetService
    ) { }


    @Get()
    async getAllInformation(): Promise<Information[]> {
        return await this.mongoService.getAllInformation();
    }

    @Get('upload')
    async uploadInformationToSpreadsheet() {
        await this.SpreadsheetService.UploadInformation();
        return { status: HttpStatus.OK, data: 'All information uploaded' }
    }

    @Delete(':id')
    async deleteRecord(@Param('id') id: string) {
        return await this.mongoService.deleteRecord(id);
    }
 
}
