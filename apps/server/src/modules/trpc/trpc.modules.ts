// trpc.module.ts
import { DynamicModule, Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ITrpcModuleOptions, TRPC_PREFIX_TOKEN, TRPC_ROUTER_TOKEN } from './trpc.interface'
import { tRPCMiddleware } from './trpc.middleware'
import { APP_GUARD } from '@nestjs/core'
import { AccessTokenGuard } from '@server/auth/access-token.guard'
import { ConfigModule } from '@nestjs/config'
import jwtConfig from '@server/commom/config/jwt.config'
import redisConfig from '@server/commom/config/redis.config'
import { JwtModule } from '@nestjs/jwt'
/**
 * tRPC模块
 */
@Module({
    imports:[
        JwtModule,
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(redisConfig),
    ]
})
export class tRPCModule implements NestModule {
    @Inject(TRPC_PREFIX_TOKEN)
    private readonly prefix!: ITrpcModuleOptions['prefix']

    static forRoot(options: ITrpcModuleOptions): DynamicModule {
        if (!options.prefix || !options.router) {
            throw new Error('trpc路由和前缀必须指定')
        }

        return {
            module: tRPCModule,
            providers: [
                // 依赖注入配置项
                { provide: TRPC_ROUTER_TOKEN, useValue: options.router },
                { provide: TRPC_PREFIX_TOKEN, useValue: options.prefix }
            ]
        }
    }

    configure(consumer: MiddlewareConsumer) {
        // 绑定tRPC中间件并指定路由前缀
        consumer.apply(tRPCMiddleware).forRoutes(this.prefix)
    }
}
