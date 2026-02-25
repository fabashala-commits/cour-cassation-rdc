import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('Starting NestJS bootstrap (ts-node)');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
  console.log('NestJS server listening on', process.env.PORT || 4000);
}

bootstrap();
