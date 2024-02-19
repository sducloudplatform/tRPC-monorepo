<script setup lang="ts">
//import { useQuery } from "vue-query"; 


import { ref } from "vue";

import { trpc } from "@common/api";

const message = ref(`Please click to send tRPC call with token to the Nest.js server`);


const hello = () => {
  // trpc.hello.query({name: "AAA"}).then((res) => {
  //   message.value = res.text;
  // }).catch((err) => {
  //   message.value = err;
  // });
  
  
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
