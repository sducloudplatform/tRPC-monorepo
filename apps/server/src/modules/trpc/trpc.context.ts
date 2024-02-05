// trpc.context.ts
import { initTRPC } from '@trpc/server'
import { Context } from './buildCreateContext'


//创建tRPC实例，后续tRPC路由定义的时候直接导入这个实例即可
export const tRPC = initTRPC.context<Context>().create()
export const router = tRPC.router
export const middleware = tRPC.middleware
export const procedure = tRPC.procedure
export const mergeRouters = tRPC.mergeRouters
