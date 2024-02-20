<template>
  <router-view />

</template>

<script lang="ts" setup>
import {
 Document,
 Menu as IconMenu,
 Location,
} from '@element-plus/icons-vue'


const date = new Date()
   const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
 width: 200px;
 min-height: 400px;
}
</style>