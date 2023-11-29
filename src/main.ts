import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60 * 5,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(9999, () =>
    console.log(`📢 Server starting on: http://localhost:${9999}/ ⚡️`),
  );
}
start();
export default start;
