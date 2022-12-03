import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExeceptionFilter } from './common/filters/http-exeception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.intercepto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * Add error filter
  app.useGlobalFilters(new AllExeceptionFilter());
  //* Add time response
  app.useGlobalInterceptors(new TimeOutInterceptor());
  //* Add Validations
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
