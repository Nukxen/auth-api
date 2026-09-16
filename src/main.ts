import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module.js';

const port = process.env.PORT || 3001;
const environment = process.env.ENVIRONMENT || 'DEV';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const origin = environment === 'PROD' ? '' : ['*'];

    app.enableCors({
      origin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 1. Remove campos que não estão no DTO (adeus confirmPassword no Prisma)
        forbidNonWhitelisted: true, // 2. Retorna erro se tentarem enviar campos extras
        transform: true, // 3. Transforma o JSON em instância da classe DTO automaticamente
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Auth Manager Central Swagger')
      .setDescription('API para gerenciamento de autenticação e autorização')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { jsonDocumentUrl: '/api/json' });

    await app.listen(port);
    console.clear();
    console.log(`Api rodando: http://localhost:${port}/api`);
  } catch (e) {
    console.clear();
    console.log(e, true);
  }
}
bootstrap();
