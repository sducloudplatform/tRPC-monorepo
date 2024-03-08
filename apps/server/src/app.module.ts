// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common'

import { tRPCModule } from './modules/trpc/trpc.modules'
import { AppService } from './app.service';
import { appRouter } from '.'
import { UserRouter } from './router/user.router';
import { UserModule } from './modules/user/user.module';
// import { OssModule } from './modules/oss/oss.module';

// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/access-token.guard';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './commom/config/jwt.config';
import { AppController } from './app.controller';
import redisConfig from './commom/config/redis.config';
import { RedisModule } from './commom/db/redis.module';
import { OssModule } from './oss/oss.module';

@Module({
    imports: [
        // 导入tRPC模块
        tRPCModule.forRoot({
            // 路由前缀
            prefix: '/trpc',
            
            // tRPC路由定义
            router: appRouter
        }),
        UserModule,

        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(redisConfig),
   
        JwtModule,

        RedisModule,
        // OssModule,

        OssModule,
     
        //如果未能提供所需的环境变量或者不符合某些验证规则，则在启动期间抛出异常
        // ConfigModule.forRoot({
        //     validationSchema:Joi.object({

        //         JWT_SECRET: Joi.string().required(),
        //         JWT_TOKEN_AUDIENCE: Joi.string().required(),
        //         JWT_TOKEN_ISSUER: Joi.string().required(),
        //         JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
    
     
        //     })

        // })
    ],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
          },
    ],
    controllers: [AppController]
})
export class AppModule {}
