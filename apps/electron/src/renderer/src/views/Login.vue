<template>
  <div style="width: 100%; height: 100vh;">
    <div style="width: 400px; margin: 100px auto">
      <el-form ref="form" :model="loginForm" size="normal" :rules="loginRules">
        
        <el-form-item   prop="username" :inline="true" > 
      <el-input prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名">  
       </el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input prefix-icon="Lock" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="validCode" >
          <div style="display: flex">
            <el-input style="width: 50%;" v-model="loginForm.validCode"  prefix-icon="Key" placeholder="请输入验证码"></el-input>
            <ValidCode style="background-color: grey;" @input="createValidCode" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" round  @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" round @click="$router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="$router.push('/')">返回 </el-button>
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

<script lang="ts" setup >

  import { User,Key,Lock} from '@element-plus/icons-vue'
  import { defineComponent } from 'vue'
  import ValidCode from "../components/ValidCode.vue";
  import {ref} from "vue"
  import { reactive } from 'vue';

 const loginForm = ref({
      username: '',
      password: '',
      validCode: '',
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
  ValidCode: ''
})

  const form=ref(null)
  
const  createdValidCode = (data:any) => {
   // 使用的时候记得 .value
  this.validCode = data
};


  const login = () => {
   this.$refs['form'].validate((valid:any) => {
        if (valid) {
          if (!this.loginForm.validCode) {
            this.$message.error("请填写验证码")
            return
          }
          if(this.loginForm.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
            this.$message.error("验证码错误")
            return
          }
          request.post("/user/login", this.form).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息
              this.$router.push("/") 
            }
              else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })
};



</script>

