import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad básica primero
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
  app.enableCors();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('API para el E-commerce')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('https://e-commerce-nemn.onrender.com', 'Producción')
    .addServer('http://localhost:3000', 'Local')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'E-commerce API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customJs: [],
    customCssUrl: []
  });
  
  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Puerto dinámico para Render
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap();
