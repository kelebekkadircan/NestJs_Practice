import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '../dto/payments.dto';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
    private readonly paymentsService: PaymentsService,
  ) {}

  @EventPattern('createPayment')
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    const newPayment =
      await this.paymentsService.createPayment(createPaymentDto);
    this.client.emit('paymentCreated', newPayment);
  }
}
