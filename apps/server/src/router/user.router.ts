import { procedure, router } from '../modules/trpc/trpc.context'
import { AppService } from '../app.service'
import { AppController } from '@server/app.controller'
import { z } from 'zod'

import { Body, UseGuards } from '@nestjs/common'
import { UserService } from '@server/modules/user/user.service'

import { userInfo } from 'os'
import { string } from 'joi'
import { Public } from '@server/commom/decorators/public.decorator'
import { AccessTokenGuard } from '@server/auth/access-token.guard'
import { UserController } from '@server/modules/user/user.controller'


export const UserRouter = router({

    user: router({
        userSignIn: procedure.input(
            z.object({
               
                username:z.string(),
                password:z.string(),

            })
        ).mutation(async(opts)=>{
            // console.log(opts.input)
            const usersignin=await opts.ctx.inject(UserController)
            return await usersignin.signIn({
          
                username:opts.input.username,
                password:opts.input.password
            })
            
        }),
        

     

        userSignUp: procedure.input(
            z.object({
                username:z.string(),
                password:z.string(),

            })
        ).mutation(async(opts)=>{
            // console.log(opts.input)
            const usersignup=await opts.ctx.inject(UserController)
            return await usersignup.signUp({
            
                username:opts.input.username,
                password:opts.input.password
            })
            
        }),


        refreshToken:procedure.query(async (opts)=>{
            const refreshToken=await opts.ctx.inject(UserController)
            
            return await refreshToken.refreshToken1(
                opts.ctx.req.body.REQUEST_USER_KEY.username,
                opts.ctx.req.body.REQUEST_USER_KEY.iat
                )

        }),


        greeting: procedure.query(async ({ ctx, input }) => {
            const greeting = await ctx.inject(AppService)
            
            return greeting.getGoodbye()
        }),
   
        greeting2:procedure.query(async ({ ctx, input }) => {
        
        const greeting = await ctx.inject(AppController)
        // return greeting.getHello(input.name)
        return greeting.getHello();
         }),  
      

       
    })
})

// 用户名密码 timestamp 

// redis： key ：uid  value： dis 时间戳  有效期：长

// response：uid 时间戳加到jwt payload

// req：查看token 验证 有效期（短）
