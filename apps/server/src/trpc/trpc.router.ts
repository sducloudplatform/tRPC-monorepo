import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "@server/trpc/trpc.service";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";


// import the createTRPCContext function (express adapter need)
import { createContext } from './trpc.context';

@Injectable()
export class TrpcRouter {
    constructor(private readonly trpc: TrpcService) {}

    appRouter = this.trpc.router({
        // check if the name is a string
        hello: this.trpc.procedure
            .input(
                z.object({
                    name: z.string().optional(),
                })
            )
            .query((opts) => {
                const { name } = opts.input;
                //console.log(`name: ${name}`);
                return { text: `Hello ${name ? name :  `no name found`} this is trpc! Your token in header is ${opts.ctx.token}` };
            })
    });

    async applyMiddleware(app: INestApplication) {
        // add trpc router to express
        app.use(`/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
                createContext,
            }),
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];