import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { PaymentsController } from './controller/payments.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [PaymentsController],
  providers: [],
})
export class PaymentsModule {}
