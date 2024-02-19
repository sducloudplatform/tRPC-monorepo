import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
var token = "ttttttoooooookkkkkkeeeeeennnnnnn";
export var trpc = createTRPCProxyClient({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc",
            /*     fetch(url, options) {
            return fetch(url, {
            ...options,
            credentials: "include",
            });
            } */
            headers: function (opts) {
                return {
                    Authorization: "Bearer ".concat(token),
                };
            },
        })
    ],
    transformer: undefined
});
