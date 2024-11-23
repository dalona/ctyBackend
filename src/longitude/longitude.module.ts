import { Module } from '@nestjs/common';
import { LongitudeService } from './longitude.service';
import { LongitudeController } from './longitude.controller';
import Longitude from './entities/longitude.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from '../contacts/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Longitude, Contact])],
  controllers: [LongitudeController],
  providers: [LongitudeService],
})
export class LongitudeModule {}
