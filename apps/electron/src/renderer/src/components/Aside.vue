<template>
  <div>
    <el-menu
        style="width:200px;min-height: calc(100vh - 50px) "
        :default-active="user"
        router
        class="el-menu-vertical-demo">
      <el-menu-item index="user"  @click="$router.push('/Todo')">首页</el-menu-item>
      <el-menu-item  >订单</el-menu-item>
      <el-menu-item  >患者</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: "Aside",

}
</script>

<style scoped>

</style>
