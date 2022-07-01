<template>
  <div>
    <el-row type="flex" justify="center">
      <img src="../../assets/img/restaurant-icon.jpg" alt="Restaurants :D">
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6" >
        <el-card class="card-login">
          <div slot="header" class="clearfix" style="align: center;">
            <span>Sign Un</span>
          </div>
          <el-form
            :model="form"
            status-icon
            ref="ruleForm"
            label-position="top"
            label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
              <el-input type="text" v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="form.email" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button
                  class="button-login"
                  type="primary"
                  :loading="loading"
                  @click="submitForm()">Register</el-button>
              </el-row>
              <el-row style="margin-top: 1rem;">
                <el-button type="danger" class="button-login" @click="goToHome">Back to Home</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      form: {},
      formTemplate: {
        name: '',
        email: '',
        password: '',
        checkPass: ''
      }
    }
  },
  created () {
    this.form = _.cloneDeep(this.formTemplate)
  },
  methods: {
    goToHome () {
      this.$router.push({ name: 'home' })
    },
    async registerUser () {
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('user_name', this.form.name)
        bodyFormData.append('email', this.form.email)
        bodyFormData.append('password', this.form.paassword)

        await axios({
          method: 'post',
          url: 'http://localhost:8080/api/user/register',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
          if (response.data.data !== undefined) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$router.push({ name: 'login' })
            return true
          }
          this.$message({
            type: 'warning',
            message: response.data.message
          })
        })
      } catch (error) {
        console.error(error)
      }
    },
    submitForm () {
      if (this.form.password === this.form.checkPass) {
        this.registerUser()
      } else {
        this.$message({
          type: 'warning',
          message: 'Passwords must be the same'
        })
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 10rem;
  margin-top: 2.5rem;
  border-radius: 1rem;
  display: block;
}
.card-login {
  margin-top: 3rem;
  background-color: #E4DCCF;
}
.button-login {
  width: 100%;
}
</style>
