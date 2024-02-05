// trpc.middleware.ts
import { Request, Response, NextFunction } from 'express'
import * as tRpcExpress from '@trpc/server/adapters/express'
import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware, Type } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { UnauthorizedException } from '@nestjs/common'


import { REQUEST_USER_KEY, refreshTokenUrl } from '@server/commom/constants/index'
import jwtConfig from '@server/commom/config/jwt.config'

import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { RedisService } from '@server/commom/db/redis.service'
import { ActiveUserData } from '@server/auth/ActiveUserData'
import redisConfig from '@server/commom/config/redis.config'
import { ITrpcModuleOptions, TRPC_ROUTER_TOKEN } from './trpc.interface'
import { buildCreateContext } from './buildCreateContext'
import {passValidUrlList} from '@server/commom/constants/index'
// import { CreateContextClass } from './buildCreateContext'
import { AccessTokenGuard } from '@server/auth/access-token.guard'
import { PrismaClientRustPanicError } from '@prisma/client/runtime/library'

@Injectable()
export class tRPCMiddleware implements NestMiddleware {
    @Inject(TRPC_ROUTER_TOKEN)
    private readonly router!: ITrpcModuleOptions['router']

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly jwtService: JwtService,
        private readonly redisService:RedisService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(redisConfig.KEY)
        private readonly reidsConfiguration: ConfigType<typeof redisConfig>,
       
        
        ) {}

    /**
     * 对接trpc中间件
     */
    async use(req: Request, res: Response, next: NextFunction) {
        console.log("pass")
        console.log(req.url)
        // ---------------------------------------------------------------------
     const url=req.url

     //路由白名单
     if(passValidUrlList.includes(url))
     {
        //do nothing
     }

    //想要刷新token
     else if(url==refreshTokenUrl){
        let token=req.get('Authorization')
        //没携带token
        if (!token) {
          throw new UnauthorizedException("请登录！")
       }
     
       if(token.indexOf('Bearer')>=0){
           token=token.replace('Bearer ','')
         }
      
   
       const payload=this.jwtService.verify(token,this.jwtConfiguration)
       req.body.REQUEST_USER_KEY=payload;
  
      
      
             
         const redisToken=(await this.redisService.get(`tokenOf${payload.sub}`))
    
         if(!redisToken){
          throw new UnauthorizedException("重新登录")
         }
         else if(redisToken==token ){
            //donothing 执行方法
          
         }
         else
         {
          
          throw new UnauthorizedException("用户身份过期")
         }
      
     }

    //正常路由 
     else {
     let token=req.get('Authorization')
     //没携带token
     if (!token)
    {
    throw new UnauthorizedException("请登录！")
    }
  
    if(token.indexOf('Bearer')>=0){
        token=token.replace('Bearer ','')
      }
      console.log(token)

    const payload=this.jwtService.verify(token,this.jwtConfiguration)

    req.body.REQUEST_USER_KEY=payload;
    console.log(req.body.REQUEST_USER_KEY.username)
    //payload:
        // {
        //     sub: 1,
        //     username: 'user',
        //     userCharacter: 1,
        //     ts: 1707121024,
        //     iat: 1707120964,
        //     aud: 'localhost:3000',
        //     iss: 'localhost:3000'
        //   }
      //13位时间
      // const time=Date.parse(new Date().toDateString())

      //10位时间
    const nowTime=parseInt(Math.round(new Date().getTime()/1000).toString());
    console.log(nowTime)
    console.log(payload.ts)

    if(nowTime>payload.ts){
          
      const redisToken=(await this.redisService.get(`tokenOf${payload.sub}`))
      //redis中存的token和请求中携带的是同一个token，则重新签发
      console.log("redisToken:"+redisToken)
      console.log("token:"+token)
      if(!redisToken){
       throw new UnauthorizedException("重新登录")
      }
      else if(redisToken==token ){
         //重新签发token
        //  console.log(666)
        //  const newToken= await this.signToken<Partial<ActiveUserData>>(
        //    payload.sub, { username: payload.username,userCharacter:payload.userCharacter,ts:nowTime})
          
        //    await this.redisService.set(`tokenOf${payload.sub}`,newToken,this.reidsConfiguration.ttl)
       console.log("签发新token")
    //    throw new UnauthorizedException("用户身份过期")
       throw  new UnauthorizedException("请求刷新token")
       
         }
      //拿老token发送请求
      else
      {
       
       throw new UnauthorizedException("用户身份过期")
      }
   }

    }
    //------------------------------------------------------------------------
        const createContext = buildCreateContext(req, res, this.moduleRef)
        // const createContext=CreateContextClass.
        // 调用方法创建createContext
        const handler = tRpcExpress.createExpressMiddleware({
            router: this.router,
            createContext
        })
        // 处理tRPC路由
        handler(req, res, next)
    }


    private async signToken<T>(userId: number, payload?: T) {
        return await this.jwtService.signAsync(
          {
            sub: userId,
      
            ...payload,
       
            
          },
          {
      
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
      
          },
        
        )
      }
}
