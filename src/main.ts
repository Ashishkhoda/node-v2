import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddelware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddelware);
  await app.listen(3000);
}
bootstrap();
