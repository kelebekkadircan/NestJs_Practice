import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  gsmNo: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  // @IsAlphanumeric() // bunu sor
  @IsNotEmpty()
  @MinLength(10, {
    message:
      'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(50, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  description: string;
}
