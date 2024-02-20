<template>
  <div style="width: 100%; height: 100vh;">
    <div style="width: 400px; margin: 100px auto">
      <div style="font-size: 30px; text-align: center; padding: 30px 0">注册</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input  v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input v-model="form.confirm"  show-password placeholder="请确认输入密码"></el-input>
        </el-form-item>

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

  import { User,Key,Lock} from '@element-plus/icons-vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {
      [User.name]: User,
      [Key.name]: Key,
      [Lock.name]: Lock,
    }, 
    data() {
    return {

      form: {
      username: '',
      password: '',
      confirm: '',
    },

      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],

        confirm: [
          {required: true, message: '请确认密码', trigger: 'blur'},
        ],
      }
    }
  },

  methods: {
  
    register() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/user/register", this.form).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "注册成功"
              })

              this.$router.push("/login")  //登录成功之后进行页面的跳转，跳转到主页
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })

        }
      })

      if (this.form.password !== this.form.confirm) {
        this.$message({
          type: "error",
          message: '2次密码输入不一致！'
        })
        return
      }

    }
  }
  })
</script>
<style type="text/css">

</style>
