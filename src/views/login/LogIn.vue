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
                  :loading="loading"
                  @click="submitForm()">Submit</el-button>
              </el-row>
              <el-row style="margin-top: 1rem;">
                <el-button class="button-login" @click="resetForm()">Register</el-button>
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

export default {
  data () {
    return {
      loading: false,
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
    goToCreateItem () {
      this.$router.push({ name: 'create.item' })
    },
    goToPuchaseItem () {
      this.$router.push({ name: 'create.item' })
    },
    submitForm () {
      this.loading = true
      const formLogIn = _.cloneDeep(this.form)
      this.form = _.cloneDeep(this.formTemplate)
      console.log(formLogIn)
    },
    resetForm () {
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
