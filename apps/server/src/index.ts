import { mergeRouters } from './modules/trpc/trpc.context'
import { UserRouter } from './router/user.router'
import { PostRouter } from './router/post.router'

export const appRouter = mergeRouters(UserRouter, PostRouter)

type AppRouter = typeof appRouter

export type { AppRouter }
