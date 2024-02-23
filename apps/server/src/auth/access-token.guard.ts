// src/auth/guards/access-token.guard.ts
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request, response } from 'express'
import { Reflector } from '@nestjs/core'
import { REQUEST_USER_KEY,refreshTokenUrl } from '@server/commom/constants/index'
import jwtConfig from '@server/commom/config/jwt.config'
import { IS_PUBLIC_KEY } from '@server/commom/decorators/public.decorator'
import { RedisService } from '@server/commom/db/redis.service'
import { JsonObject } from '@prisma/client/runtime/library'
import { timeStamp } from 'console'
import { ActiveUserData } from './ActiveUserData'
import redisConfig from '@server/commom/config/redis.config'
import {passValidUrlList} from '@server/commom/constants/index'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly redisService:RedisService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(redisConfig.KEY)
    private readonly reidsConfiguration: ConfigType<typeof redisConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    

    //带有public注解的，如登录、注册无需经过守卫
    // const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    // if (isPublic)
    // {console.log(111)
    //  return true
    // }
      
    const req= context.switchToHttp().getRequest()
   
    const url=req.url
    console.log(url)

    //路由白名单
    if(passValidUrlList.includes(url))
    {
       //do nothing
    }

   //想要刷新token
    else if(url==refreshTokenUrl){
       let token=req.get( 'Authorization')
       //没携带token
       if (!token) {
         throw new UnauthorizedException("请登录！")
      }
    
      if(token.indexOf('Bearer')>=0){
          token=token.replace('Bearer ','')
        }
     
  
      const payload=this.jwtService.verify(token,this.jwtConfiguration)
      req.body.username=payload.username;
      req.body.iat=payload.iat;
 
     
     
            
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
    
  
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? []
    return token
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
