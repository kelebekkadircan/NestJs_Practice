import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const isDebugMode = configService.get<string>('DEBUG') == 'true' ? true : false;

const swaggerConfigFirst = new DocumentBuilder()
  .setTitle('STARTER BACKEND API')
  .setDescription('Basic API setup for a backend project.')
  .setVersion('1.0.1')
  .addGlobalParameters({
    in: 'header',
    required: false,
    name: 'x-custom-lang',
    schema: {
      example: 'tr',
    },
  });

if (!isDebugMode) {
  swaggerConfigFirst
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-AUTH', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addSecurityRequirements('JWT-AUTH');
}

export const swaggerConfig = swaggerConfigFirst.build();
