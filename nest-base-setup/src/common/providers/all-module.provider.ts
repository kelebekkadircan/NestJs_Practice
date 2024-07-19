import { Module } from '@nestjs/common';
import { AuthModule } from '@app/modules/core/auth/auth.module';
import { UserModule } from '@app/modules/core/user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
})
export class AllModuleProvider {}
