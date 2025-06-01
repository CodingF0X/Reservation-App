import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('User Management Service API Documentation')
    .setDescription('Comprehensive API documentation for all endpoints')
    .setVersion('1.0')
    .addBearerAuth() // For JWT Authentication in Swagger
    .addTag('Users') 
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Persist auth between page reloads
    },
  });
}