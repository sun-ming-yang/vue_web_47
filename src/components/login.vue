<template>
  <div class="login-container">
    <div class="login_box">
      <div class="avater">
        <img src="../assets/images/logo.png">
      </div>
      <el-form :model="loginform" :rules="loginformRules" ref="loginformRef">
        <el-form-item prop="username">
          <el-input v-model="loginform.username" autofocus>
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginform.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      loginformRules: {
        username: [{ required: true, message: '请输入登录名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm() {
      // 重置表单  resetFields()查看文档
      this.$refs.loginformRef.resetFields()
    },
    login() {
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) return this.$message.error('登录失败')
        const { data: res } = await this.$http.post('login', this.loginform)
        // console.log(res.data)
        if (res.meta.status !== 200) {
          // 登录失败删除之前的token
          window.sessionStorage.removeItem('token')
          return this.$message.error('登录失败')
        }
        this.$message.success('登录成功')
        // 跳转到后台主页 记录token
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  .login_box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avater {
      width: 130px;
      height: 130px;
      border: 1px solid #ccc;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
