<template>
  <div class="page-login">
    <div>
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>Please log in first</span>
        </div>
        <!-- card body -->
        <el-form class="card-body" ref="form" label-width="80px">
          <el-form-item label="username">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="password">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="danger" @click="register">Register</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.model)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      this.$message({
        type: 'success',
        message: 'login success',
      })
      this.$router.push('/')
    },
    async register() {
      const res = await this.$http.post('/register', this.model)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      this.$message({
        type: 'success',
        message: 'Register success',
      })
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.page-login {
  .card-view {
    width: 30%;
    padding: 2rem;
    margin: 8% auto;
    .card-body {
      margin-top: 2rem;
    }
  }
}
</style>
