import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresqlProviderModule } from './common/providers/database/postgresql/provider.module';
import { I18nProviderModule } from './common/providers/i18n/provider.module';
import { AllModuleProvider } from './common/providers/all-module.provider';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    I18nProviderModule,
    AllModuleProvider,
    PostgresqlProviderModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot([
      // {
      //   name: 'short',
      //   ttl: 1000,
      //   limit: 3,
      // },
      {
        name: 'medium',
        ttl: 10000,
        limit: 500,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 2000,
      },
    ]),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
