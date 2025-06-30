import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { CORS_CONFIG, envs, RpcCustomExeptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Clientgateway - Main');
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.enableCors(CORS_CONFIG);

  app.use(json({ limit: '250mb' }));

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

  const config = new DocumentBuilder()
    .setTitle('Client Gateway')
    .setDescription('The Client Gateway API')
    .setVersion('1.0')
    .addTag('Departments ✅')
    .addTag('Positions ✅')
    .addTag('Bank ✅')
    .addTag('Employees ✅')
    .addTag('Asigned Positions ✅')
    .addTag('Documents Types ✅')
    .addTag('Documents ✅')
    .addTag('Extensions ✅')
    .addTag('Projects ✅')
    .addTag('Headquarters ✅')
    .addTag('Staff ⚠️')
    .addTag('TypeSignature ✅')
    .addTag('Signature ⚠️')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new RpcCustomExeptionFilter());

  await app.listen(envs.PORT_APP);
  logger.log(`Gateway running on port ${envs.PORT_APP}`);
}
bootstrap();
