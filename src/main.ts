import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // openAPI:
  const documentationConfig: Omit<OpenAPIObject, 'paths'> =
    new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .addTag('nestjs-demo')
      .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    documentationConfig,
  );
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}

bootstrap().then();
