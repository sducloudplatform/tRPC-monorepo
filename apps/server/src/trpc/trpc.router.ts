import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "@server/trpc/trpc.service";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

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
            .query(({input}) => {
                const { name } = input;
                //console.log(`name: ${name}`);
                return { text: `Hello ${name ? name :  `AAA`} this is trpc!`,
            };
        }),
    });

    async applyMiddleware(app: INestApplication) {
        // add trpc router to express
        app.use(`/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
            }),
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];