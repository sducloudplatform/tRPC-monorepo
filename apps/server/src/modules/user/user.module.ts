import { Module } from '@nestjs/common'


import { AppService } from '../../app.service';
import { UserService } from './user.service';
import { PrismaModule } from '@server/modules/prisma/prisma.module';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '@server/commom/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@server/auth/access-token.guard';
import redisConfig from '@server/commom/config/redis.config';
import {verificationCodeModule} from './verificationcode/verificationcode.module'
import {HttpModule} from '@nestjs/axios'
// import { AppController } from './app.controller';

@Module({
    imports:[PrismaModule,  
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(redisConfig),
        JwtModule,
        verificationCodeModule,
        HttpModule,
     
   
       
        
    ],
    providers: [UserService],
    controllers:[UserController],
    exports:[UserService]
    
})
export class UserModule {}