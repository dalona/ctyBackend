import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  const port = process.env.PORT || 3000;

  // Escucha en el puerto
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

