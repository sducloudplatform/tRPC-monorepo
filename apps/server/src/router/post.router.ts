import { procedure, router } from '../modules/trpc/trpc.context'

export const PostRouter = router({
    post: router({
        list: procedure.query(async () => {
            return "111"
        })
    }) ,
})
