import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/typeorm/entities/Payment';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dto/payments.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const newPayment = this.paymentRepository.create(createPaymentDto);
    const savedPayment = await this.paymentRepository.save(newPayment);
    return {
      message: {
        message: 'Payment created successfully',
        status: 201,
      },
      savedPayment,
    };
  }
}
