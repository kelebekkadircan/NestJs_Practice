import { CreateHotelDto } from './CreateHotels';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatedHotelDto extends PartialType(CreateHotelDto) {}
