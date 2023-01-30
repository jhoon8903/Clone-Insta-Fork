import { ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { Server, ServerOptions } from 'spdy';
const express = require('express');
const spdy = require('spdy');

async function bootstrap() {
  const expressApp = express();
  const spdyOpts: ServerOptions = {
    ca: fs.readFileSync(
      '/etc/letsencrypt/live/codingtestrg.shop/fullchain.pem',
    ),
    key: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/codingtestrg.shop/cert.pem'),
    spdy: {
      protocols: ['h2', 'spdy/3.1', 'spdy/3', 'spdy/2', 'http/1.1'],
      connection: { autoSpdy31: true },
    },
  };

  const server: Server = spdy.createServer(spdyOpts, expressApp);
  const app: NestApplication = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  //* Static Assets

  //* 전역으로 Pipes 설정
  app.useGlobalPipes(new ValidationPipe());

  //* Swagger 설정.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('비슷하구만그램')
    .setDescription('인스타그램 클론코딩')
    .setVersion('1.0.0')
    .addTag('instagram')
    .build();

  //* Swagger Setup
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  //* Cors Setting
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.init();
  await server.listen(process.env.HTTPS_PORT);
}
bootstrap();
