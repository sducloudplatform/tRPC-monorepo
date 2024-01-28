<script setup lang="ts">
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
//import { useQuery } from "vue-query"; 
// from server
import type { AppRouter } from "@server/trpc/trpc.router";

import { ref } from "vue";



const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: "http://localhost:3000/trpc", 
/*     fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    } */
    })
  ],
  transformer: undefined
});

const message = ref(`Please click to send tRPC call hello to the Nest.js server`);

const hello = () => {
  message.value = `Sending tRPC call hello to the Nest.js server`;
  trpc.hello.query({name: "AAA"}).then((res) => {
    message.value = res.text;
  }).catch((err) => {
    message.value = err;
  });
}


</script>

<template>
<p class="tip">{{message}}</p>
  <div class="actions">
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="hello">Send Hello</a>
    </div>
  </div>
</template>
