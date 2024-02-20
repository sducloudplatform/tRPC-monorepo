<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">个人主页</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown>
 <el-button @click="$router.push('/login')">登录</el-button>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
  props: ['user'],
  data() {
    return {
user:{}
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}"
    this.user=JSON.parse(userStr)
  }
}
</script>

<style scoped>

</style>
