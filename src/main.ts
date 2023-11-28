import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 999;

    const corsOptions = {
      origin: process.env.FRONTEND_BASE_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    };

    app.enableCors(corsOptions);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.listen(port, () =>
      console.log(`📢 Server starting on: http://localhost:${port}/ ⚡️`),
    );
  } catch (e) {
    throw new Error('❌ Failed to start server', e);
  }
}
start();
