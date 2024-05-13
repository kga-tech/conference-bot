import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './information.schema';
import { MongodbController } from './mongodb.controller';

import { MongodbService } from './mongodb.service';
import { SpreadSheetService } from './spreadsheet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Information.name, schema: InformationSchema}])
  ],
  providers: [
    MongodbService,
    SpreadSheetService
  ],
  exports: [MongodbService],
  controllers: [MongodbController]
})
export class MongodbModule {}
