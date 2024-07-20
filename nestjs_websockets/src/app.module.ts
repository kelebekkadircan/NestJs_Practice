import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule, GatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
