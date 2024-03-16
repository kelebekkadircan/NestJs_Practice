import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { HotelsService } from 'src/hotels/services/hotels/hotels.service';
import { CreateHotelDto } from 'src/users/dtos/hotels/CreateHotels';
import { UpdatedHotelDto } from 'src/users/dtos/hotels/UpdatedHotelDto';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelService: HotelsService) {}

  @Get()
  async getHotels() {
    const users = await this.hotelService.findHotels();

    return users;
  }

  @Post()
  createHotel(@Body(ValidationPipe) createHotelDto: CreateHotelDto) {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Put(':id')
  async updateHotelById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHotelDto: UpdatedHotelDto,
  ) {
    return await this.hotelService.updateHotel(id, updateHotelDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.hotelService.deleteHotel(id);
  }
}
