import { Body, Controller, Get, UseGuards, Request, Query, Param} from '@nestjs/common';

import { Post } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Inject } from '@nestjs/common';
import jwtConfig from '@server/commom/config/jwt.config';
import redisConfig from '@server/commom/config/redis.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UserService } from './user.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
// import { Prisma,user } from '@prisma/client';

import {user} from '@prisma/client'
import { ActiveUserData } from '@server/auth/ActiveUserData';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessTokenGuard } from '@server/auth/access-token.guard';
import { Public } from '@server/commom/decorators/public.decorator';
import { RedisService } from '@server/commom/db/redis.service';
import { OPTIONAL_DEPS_METADATA } from '@nestjs/common/constants';
import { options } from 'joi';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';
import { validUserDto } from './dto/vaild-user.dto';
import { VerificationCodeService } from './verificationcode/verificationcode.service';
import {WXSignInDto} from './dto/wxSignin.dto'
import {HttpService} from '@nestjs/axios'
import {AxiosResponse} from 'axios'
import { map } from 'rxjs/operators';
// import {WXBizDataCrypt} from 'apps\server\src\utils\WXBizDataCrypt'

@Controller('user')
export class UserController {
  constructor(

    private readonly jwtService: JwtService,
    private readonly httpService:HttpService,
    private readonly userService:UserService,
    private readonly verificationCodeService:VerificationCodeService,
  
 
    private redisService:RedisService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(redisConfig.KEY)
    private readonly reidsConfiguration: ConfigType<typeof redisConfig>,
  ) {}
    
    //
    @Get('hello')
    async hello(){
      console.log(111)
      return {string:'hello'}
    }


    //注册
    @Post('signUp')
    async signUp(@Body() signUpDto:SignUpDto) {
    // TODO sign up
    // async createUser(data: Prisma.userCreateInput): Promise<user> {
    //     return this.prisma.user.create({
    //       data,
    //     });
    //   }

    //查看此用户名是否已经使用
    const username = signUpDto.username;
    const existUser = await this.userService.FindOneByUsername(username)
    console.log(existUser)
    if (existUser)
      throw new UnauthorizedException('User already exists')
    // const existUser = await this.prisma.user.findUnique({
    //     where: {
    //       uid:uid
    //     },
    //   })

    const createUserDto = {
      username: username,
      password: signUpDto.password,

    }


    // const hashPassword=await this.hashingService.hash(data.password)
    // data.password=hashPassword;

    return this.userService.Create(createUserDto)

  }
  
    
  //登录

    @Post('signIn')
    async signIn(@Body() findUserDto:FindUserDto) {
    const { username, password } = findUserDto

    const user = await this.userService.FindOneByUsername(username)
    if (!user)
      throw new UnauthorizedException('User not found')

    // const isEqual = await this.hashingService.compare(password, user.password)
    if (password != user.password)
      throw new UnauthorizedException('Password is incorrect')

    return await this.generateTokens(user,this.reidsConfiguration.ttl)
    }

    @Post('wxSignIn')
    async wxSignIn(@Body() wxSignInDto:WXSignInDto){
     
        const appid=process.env['APPID'];
        const appsecret=process.env['APPSECRET']
        const granttype='wx_authorization'

        const{code,iv,encryptedData}=wxSignInDto;


        const url = `https://api.weixin.qq.com/sns/jscode2session?
        grant_type=${granttype}
        &appid=${appid}
        &secret=${appsecret}
        &js_code=${code}`

        

        const info =await this.getInfoFromWxServer(url);

        //info：
        // {
        //   "openid":"xxxxxx",
        //   "session_key":"xxxxx",
        //   "unionid":"xxxxx",
        //   "errcode":0,
        //   "errmsg":"xxxxx"
        //   }

        //session_key以及小程序端传过来的iv和encryptedData去解密即可得到手机号码。
        
        //解密
        // const decode=new WXBizDataCrypt(appid,info.data?.session_key)
        // const decode_data=decode.decryptData(encryptedData,iv)
        


    }




    @Get('refreshToken')
    async refreshToken(@Body() body:validUserDto){
      
      
      const username=body.username;
      const iat=body.iat;
    
      return await this.refreshToken1(username,iat)}




    @Post('getVerifyCode')
    async getVerifyCode(@Query('phone') phone:string ){
        console.log(phone)
        const toResult=await this.verificationCodeService.sendVerificationCode(phone);
        console.log(toResult)
        console.log(toResult.verificationCode)
        if(toResult.isOk){
          console.log(111111111111)
          console.log(phone)
          await this.redisService.set(`${phone}`,toResult.verificationCode,180000)
          
          const verificationCode=toResult.verificationCode;
          return {verificationCode}
       
        }


        
    }


  async refreshToken1(username:string,tokenCreatTime:number){
    //  const user=this.userService.FindOneByUsername(username)


    //  return await this.generateTokens(user,tokenCreatTime)
    const user = await this.userService.FindOneByUsername(username)
    if (!user)
      throw new UnauthorizedException('User not found')

    // const isEqual = await this.hashingService.compare(password, user.password)

    const nowTime = parseInt(Math.round(new Date().getTime() / 1000).toString());

    console.log(nowTime)
    console.log(tokenCreatTime)
    const ttl = 24 * 60 * 60 * 1000 - ((nowTime - tokenCreatTime) * 1000)

    console.log(ttl)
    return await this.generateTokens(user, ttl)

  }

  async generateTokens(user: user, redisTTL: number) {
    const token = await this.signToken<Partial<ActiveUserData>>(
      user.uid, {
      username: user.username || '',
      userCharacter: user.relation_characterid || undefined,
      ts: parseInt(Math.round(new Date().getTime() / 1000).toString())
        + parseInt(process.env.JWT_ACCESS_TOKEN_TTL || '')
    }

    )
    await this.redisService.set(`tokenOf${user.uid}`,
      token, redisTTL)

    return {
      token
      , type: 'Bearer'
    }
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
        // expiresIn: this.jwtConfiguration.accessTokenTtl
      },

    )
  }

  private getInfoFromWxServer(url:string):Promise<AxiosResponse>{
    
    return this.httpService.post(url).pipe(map(response => response)).toPromise() as Promise<AxiosResponse>



  }

  // decryptData(encryptedData: string, iv: string, sessionKey: string): Promise<any> {
  //   const crypto=require('crypto');
  //   const encryptedDataNew = Buffer.from(encryptedData, 'base64');
  //   const keyNew = Buffer.from(sessionKey, 'base64');
  //   const ivNew = Buffer.from(iv, 'base64');

  //   const decipher = crypto.createDecipheriv('aes-128-cbc', keyNew, ivNew);
  //   let decrypted = decipher.update(encryptedDataNew, 'binary', 'utf8');
  //   decrypted += decipher.final('utf8');

  //   return JSON.parse(decrypted);
  // }
}
