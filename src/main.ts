import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

const setSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('nest-server')
    .setDescription('Nest-server API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api/_doc', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
      methods: 'GET,POST',
    }
  });
  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  setSwagger(app);

  await app.listen(3000);
}
bootstrap();
