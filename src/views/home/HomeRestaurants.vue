<template>
  <div>
    <el-card class="navbar" shadow="hover">
      <el-row >
        <el-col :span="2">
          <img src="../../assets/img/restaurant-icon.jpg" alt="restaurant" class="image">
        </el-col>
        <el-col :span="6" >
          <div class="title-card">
            <b>Restaurants :D</b>
          </div>
        </el-col>
        <el-col :span="6" v-if="false">
          <div class="user-card">
            Welcome: {{ userCard }}
          </div>
        </el-col>
        <el-col :span="16">
          <el-button
            type="info"
            class="button-home"
            @click="handleLogin"
            plain><b>Log in</b></el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row style="margin-top: 2rem;" type="flex">
      <el-col :span="24">
        <el-card style="margin-left: 1rem; margin-right: 1rem;">
          <el-table
            :data="list"
            v-loading="loading"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Name resturant"
              width="200">
            </el-table-column>
            <el-table-column
              prop="type"
              label="Type food"
              width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Resturant address"
              width="300">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="Resturant telephone"
              width="300">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      list: [],
      loading: false
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
    handleLogin () {
      this.$router.push({ name: 'login' })
    },
    async fetchRestaurants () {
      try {
        await axios({
          method: 'get',
          url: 'http://localhost:8080/api/restaurant/list'
        }).then((response) => {
          this.list = response.data.data
          if (this.list !== undefined) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.button-home {
  float: right;
  margin-right: 40px;
  margin-top: 1rem;
  width: 100px;
}
.title-card {
  margin-left: 12px;
  font-family:'Courier New', Courier, monospace;
  margin-top: 1rem;
  font-size: 2rem;
}
.user-card {
  margin-top: 1.5rem;
  font-size: 20px;
  color: #7D9D9C;
}
.navbar {
  background-color: #f5f3f0;
}
.image {
  width: 70%;
  display: block;
}
</style>
