import { Options, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExeceptionFilter } from './common/filters/http-exeception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.intercepto';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * Add error filter
  app.useGlobalFilters(new AllExeceptionFilter());
  //* Add time response
  app.useGlobalInterceptors(new TimeOutInterceptor());
  //* Add Validations
  app.useGlobalPipes(new ValidationPipe());
  //* Add swagger
  const options = new DocumentBuilder()
  .setTitle('SuperFlight API')
  .setDescription('Scheduled Flights App')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  //* Route swagger
  SwaggerModule.setup('/api/docs', app, document, {
	  swaggerOptions:{
		  filter:true
	  }
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
