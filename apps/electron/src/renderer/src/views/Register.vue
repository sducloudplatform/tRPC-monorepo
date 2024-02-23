<template>
  <div style="width: 100%; height: 100vh;">
    <div style="width: 400px; margin: 100px auto">
      <div style="font-size: 30px; text-align: center; padding: 30px 0">注册</div>
      <el-form ref="form" :model="loginForm" size="normal" :rules="loginRules">
        <el-form-item prop="username">
          <el-input  v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input v-model="loginForm.confirm"  show-password placeholder="请确认输入密码"></el-input>
        </el-form-item>
        <el-radio-group v-model="loginForm.relation_characterid">
          <el-radio :label="1" @change="getRadioVal">医生</el-radio>
          <el-radio :label="2" @change="getRadioVal">职工</el-radio>
        </el-radio-group>
        <el-form-item>
          <el-button style="width: 100%" type="primary" round @click="register">注 册</el-button>
        </el-form-item>
        <el-form-item>
           <el-button  style="width: 100%" type="primary" round  @click="$router.push('/')">返回 </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>


<script lang="ts">
 export default defineComponent({
    components: {
      [User.name]: User,
      [Key.name]: Key,
      [Lock.name]: Lock,
      ValidCode
    },
    
  })
</script>


<script lang="ts" setup>

  import { User,Key,Lock} from '@element-plus/icons-vue'
  import { defineComponent } from 'vue'
  import ValidCode from "../components/ValidCode.vue";
  import {ref} from "vue"
  import { reactive } from 'vue';
  import { getCurrentInstance} from 'vue'
  import request from "../utils/request.js"

  const form = ref(null)
  const instance = getCurrentInstance()
  const _this= instance.appContext.config.globalProperties
  const loginForm = ref({
    username: '',
      password: '',
      confirm: '',
      relation_characterid: ''
    })

    const loginRules = reactive({
  username: [
    {
      required: true,
      message: '用户名为4~16字符之间（中文、字母、数字或下划线）',
      min: 6, max: 18,
      trigger: 'blur',
    },],
  password: [
    {
      required: true,
      message: '密码为6~18位字母、数字和符号',
      min: 6, max: 18,
      trigger: 'blur',
    },
    // { min: 6, max: 18, message: '密码字符为6~18之间', trigger: 'blur' },
  ],
})

const  getRadioVal = (data:any) => {
  console.log(loginForm.value.relation_characterid);
};
const register = async () => {

if (loginForm.value.password !== loginForm.value.confirm) {
        _this.$message({
          type: "error",
          message: '2次密码输入不一致！'
        })
        return
      }
  form.value.validate((valid) => {
        if (valid) {
          request.post("/user/register", loginForm).then(res => {
            if (res.code === '0') {
              _this.$message({
                type: "success",
                message: "注册成功"
              })

              _this.$router.push("/login")  //登录成功之后进行页面的跳转，跳转到主页
            } else {
              _this.$message({
                type: "error",
                message: "注册失败"
              })
            }
          })

        }
      })
      

};
 
  
</script>
<style type="text/css">

</style>
