import { NestFactory } from '@nestjs/core';
import {json, urlencoded} from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
