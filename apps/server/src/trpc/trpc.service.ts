import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

import type { TRPCContext } from './trpc.context';


@Injectable()
export class TrpcService {
  // pass the context into trpc instance
  trpc = initTRPC.context<TRPCContext>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}