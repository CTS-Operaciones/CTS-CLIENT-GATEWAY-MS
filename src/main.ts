import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { CORS_CONFIG, envs } from './common';

async function bootstrap() {
  const logger = new Logger('Clientgateway - Main');
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS_CONFIG);

  app.setGlobalPrefix('api');

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(envs.PORT_APP);
  logger.log(`Gateway running on port ${envs.PORT_APP}`);
}
bootstrap();
