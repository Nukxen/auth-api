import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Shared HTTP setup used for both local server and serverless handler.
 */
export const setupApp = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('Controle interno de usuarios na api')
    .setVersion('1.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { jsonDocumentUrl: '/api/json' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
};
