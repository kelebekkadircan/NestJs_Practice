import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'tr',
        fallbacks: { 'en-*': 'en', 'tr-*': 'tr' },
        loaderOptions: { path: path.join(__dirname, '../../../i18n/'), watch: true },
        logging: false,
      }),
      resolvers: [new QueryResolver(['lang', 'l']), new HeaderResolver(['x-custom-lang']), new CookieResolver(), AcceptLanguageResolver],
      inject: [ConfigService],
    }),
  ],
})
export class I18nProviderModule {}
