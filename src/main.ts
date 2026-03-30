import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { globalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (development)
  app.enableCors();

  // Global prefix
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(globalValidationPipe);

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('RESTful API for a food delivery platform built with NestJS, Prisma, and MongoDB')
    .setVersion('1.0')
    .addTag('Health', 'Health check endpoints')
    .addTag('Shops', 'Shop management endpoints')
    .addTag('Products', 'Product listing and filtering endpoints')
    .addTag('Orders', 'Order creation and history endpoints')
    .addTag('Coupons', 'Coupon management and validation endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application running on: http://localhost:${port}/api`);
  console.log(`Swagger docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
