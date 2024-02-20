<template class="a1">
  <!--头部-->
  <Header />
  <!--   主体-->
  <div style="display: flex">
    <!--      侧边栏-->
    <Aside />

    <!--      内容区域-->
    <router-view style="flex: 1"/>

  </div>
</template>

<script lang="ts">

import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped>

</style>
