import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dinastia M - API')
    .setDescription(
      'API com registros sobre a saga dinastia M da marvel. Contém dados sobre os quadrinhos, criadores e heróis presentes nesta saga.',
    )
    .setVersion('1.0')
    .addTag('House-of-m')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
