import { EventsModule } from './../events/events.module';
import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

@Module({
  imports: [EventsModule],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
