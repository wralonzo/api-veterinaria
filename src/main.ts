import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const limitMbUploadJson = config.get<number>('LIMIT_MB_UPLOAD_JSON');

  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }, //to avoid Type transform in DTO's definition
    }),
  );

  app.use(json({ limit: limitMbUploadJson }));
  app.use(urlencoded({ extended: true, limit: limitMbUploadJson }));

  await app.listen(port, () => {
    console.log('[API]', `http://localhost:${port}/api/v1/`);
  });
}
bootstrap();
