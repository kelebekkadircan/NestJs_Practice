import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/handle-all-exception';
import { API_PREFIX } from './common/constants/api-doc.constant';
import { swaggerConfig } from './common/config/swagger/swagger.config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ThrottlerExceptionFilter } from './common/exceptions/throttler.exception';
import { useContainer } from 'class-validator';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ['1'],
    })
    .setGlobalPrefix(API_PREFIX);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new HttpExceptionFilter(config));
  app.useGlobalFilters(new ThrottlerExceptionFilter(config));

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, swaggerDocument);

  await app.listen(config.get('PORT'), () => {
    console.log(`Listening on ${config.get('PORT')}`);
  });

}

bootstrap();
