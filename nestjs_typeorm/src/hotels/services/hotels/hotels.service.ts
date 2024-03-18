import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/Hotel';
import { CreateHotelDto } from 'src/users/dtos/hotels/CreateHotels';
import { UpdatedHotelDto } from 'src/users/dtos/hotels/UpdatedHotelDto';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel) private HotelRepository: Repository<Hotel>,
  ) {}

  findHotels() {
    return this.HotelRepository.find();
  }

  createHotel(HotelDetails: CreateHotelDto) {
    const newHotel = this.HotelRepository.create({
      ...HotelDetails,
    });
    return this.HotelRepository.save(newHotel);
  }

  updateHotel(id: number, updateHotelDetails: UpdatedHotelDto) {
    return this.HotelRepository.update({ id }, { ...updateHotelDetails });
  }
  deleteHotel(id: number) {
    return this.HotelRepository.delete({ id });
  }
}
