// trpc.interface.ts
import { AnyRouter } from '@trpc/server/dist/core/router'

export interface ITrpcModuleOptions<TRouter extends AnyRouter = AnyRouter> {
    prefix: '/trpc' | string
    router: TRouter
}

// 存放tRPC路由
export const TRPC_ROUTER_TOKEN = Symbol('TRPC_ROUTER_TOKEN')

// 存放tRPC路由前缀
export const TRPC_PREFIX_TOKEN = Symbol('TRPC_PREFIX_TOKEN')

