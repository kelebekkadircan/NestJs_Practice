import { Module } from '@nestjs/common';
import { HotelsController } from './controllers/hotels/hotels.controller';
import { HotelsService } from './services/hotels/hotels.service';
import { Hotel } from 'src/hotels/entities/Hotel';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
