import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      tryItOutEnabled: false,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };
  const config = new DocumentBuilder()
    .setTitle(`Backend de l'application "Noodle Budget"`)
    .setDescription(
      `Executable API Doc, all endpoints are testables in real conditions`,
    )
    .setVersion('1.O')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerDocumentOptions);
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
