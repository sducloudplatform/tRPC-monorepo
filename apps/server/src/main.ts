import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as tRpcExpress from '@trpc/server/adapters/express'
import { AccessTokenGuard } from './auth/access-token.guard';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { ConfigType, registerAs } from '@nestjs/config'
import jwtConfig from './commom/config/jwt.config';
const listenPost = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  
  console.log(`listen in http://localhost:${listenPost}`)



  await app.listen(listenPost);
}
bootstrap();
