<template>
  <div>
    <el-row type="flex" justify="center">
      <img src="../../assets/img/restaurant-icon.jpg" alt="Restaurants :D">
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6" >
        <el-card class="card-login">
          <div slot="header" class="clearfix" style="align: center;">
            <span>Log In</span>
          </div>
          <el-form
            :model="form"
            status-icon
            ref="ruleForm"
            label-position="top"
            label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="form.email" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button
                  class="button-login"
                  type="primary"
                  @click="submitForm()">Submit</el-button>
              </el-row>
              <el-row style="margin-top: 1rem;">
                <el-button class="button-login" @click="goToSignUp">Sign Up</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      data: null,
      form: {},
      formTemplate: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    this.form = _.cloneDeep(this.formTemplate)
  },
  methods: {
    goToSignUp () {
      this.$router.push({ name: 'signup' })
    },
    async loginUser () {
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('email', this.form.email)
        bodyFormData.append('password', this.form.password)

        await axios({
          method: 'post',
          url: 'http://localhost:8080/api/user/login',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
          this.token = response.data.token
          if (this.token !== undefined) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$router.push({ name: 'panel' })
          } else {
            this.$message({
              type: 'warning',
              message: response.data.message
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    submitForm () {
      this.loginUser()
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
