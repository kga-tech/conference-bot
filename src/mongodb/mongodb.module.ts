import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from './information.schema';
import { MongodbController } from './mongodb.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Information.name, schema: InformationSchema}])
  ],
  providers: [
    MongodbService
  ],
  exports: [MongodbService],
  controllers: [MongodbController]
})
export class MongodbModule {}
