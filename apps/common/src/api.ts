import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";


// from server
import type { AppRouter } from "@server/index"

const token = `ttttttoooooookkkkkkeeeeeennnnnnn`;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      /*     fetch(url, options) {
      return fetch(url, {
      ...options,
      credentials: "include",
      });
      } */
      headers(opts) {
        return {
          Authorization: `Bearer ${token}`,
        };
      },
    })
  ],
  transformer: undefined
});