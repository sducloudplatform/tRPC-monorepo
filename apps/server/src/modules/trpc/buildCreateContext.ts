import { Request, Response } from 'express'
import { Injectable, Type } from '@nestjs/common'
import { ContextIdFactory, ModuleRef } from '@nestjs/core'
import { UnauthorizedException } from '@nestjs/common'
import { REQUEST_USER_KEY } from '@server/commom/constants/index'
import jwtConfig from '@server/commom/config/jwt.config'
import { Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import { RedisService } from '@server/commom/db/redis.service'
import { ActiveUserData } from '@server/auth/ActiveUserData'
import redisConfig from '@server/commom/config/redis.config'
type Context = {
    res: Response
    req: Request
    inject: <TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol) => Promise<TResult>
}

type BuildCreateContextFn<TContext, TContextFn = () => TContext> = (
    req: Request,
    res: Response,
    moduleRef: ModuleRef
) => TContextFn




    const buildCreateContext: BuildCreateContextFn<Context> = (req: Request, res: Response, moduleRef: ModuleRef) => {
    // trpc上下文内使用inject注入nest依赖项
    const inject = <TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | Function | string | symbol) => {
        // 获取当前请求上下文id
        const contextId = ContextIdFactory.getByRequest(req)
        // 获取请求上下文对应moduleRef实例并resolve依赖
        return moduleRef.resolve<TResult>(typeOrToken, contextId, {
            strict: false
        })
    }
    
    return () => ({
        req,
        res,
        inject
    })
    

}
 





export {buildCreateContext, Context }
