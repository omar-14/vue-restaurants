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
        <el-col :span="6">
          <div class="user-card">
            Welcome: {{ userCard }}
          </div>
        </el-col>
        <el-col :span="9">
          <el-button
            type="info"
            class="button-home"
            @click="goToLogout"
            plain><b>Log Out</b></el-button>
          <el-button
            type="success"
            style="margin-top: 1rem;"
            @click="handleRegister"
            plain><b>Register a new Restaurant</b></el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      :title="titleCard"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form
        label-position="top"
        label-width="100px"
        :model="form">
        <el-form-item
          label="Restaurant name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Kind of food">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item
          label="Restaurant address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item
          label="Restaurant telephone">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="success" @click="registerRestaurant">Register</el-button>
      </span>
    </el-dialog>

    <el-row style="margin-top: 2rem;" type="flex">
      <el-col :span="activeForm ? 14 : 24">
        <el-card style="margin-left: 1rem; margin-right: 1rem;">
          <el-table
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="Name resturant"
              :width="activeForm ? 180 : false">
            </el-table-column>
            <el-table-column
              prop="type"
              label="Type food"
              :width="activeForm ? 100 : false">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Resturant address"
              :width="activeForm ? 300 : false">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="Resturant telephone"
              :width="activeForm ? 180 : false">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Operaciones"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="handleEdit(scope.$index, scope.row)"
                  type="warning"
                  size="mini">Edit</el-button>
                <el-button
                  @click.native.prevent="handleDelete(scope.$index, scope.row)"
                  type="danger"
                  size="mini">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="activeForm ? 10 : 0">
        <el-card shadow="hover" >
          <div slot="header" class="clearfix" style="align: center">
            <span>{{ titleCard }}</span>
          </div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="form">
            <el-form-item
              label="Restaurant name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item
              label="Kind of food">
              <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item
              label="Restaurant address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item
              label="Restaurant telephone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom clearfix button-form">
            <el-row>
              <el-col :span="5">
                <el-button
                  type="danger"
                  class="button"
                  @click="() => (this.activeForm = false)"
                  icon="el-icon-back">Cancel</el-button>
              </el-col>
              <el-col :span="5">
                <el-button
                  type="warning"
                  @click="handleEdit"
                  class="button"
                  icon="el-icon-collection-tag">Save</el-button>
              </el-col>
            </el-row>
          </div>
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
      activeForm: false,
      dialogVisible: false,
      isEdit: true,
      titleCard: '',
      userCard: 'Omar Ramos',
      list: [],
      form: {},
      formTemplate: {
        name: '',
        type: '',
        address: '',
        telephone: ''
      }
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
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
    },
    handleRegister () {
      this.titleCard = 'Register a new Restaurant'
      this.dialogVisible = true
      this.form = _.cloneDeep(this.formTemplate)
    },
    async registerRestaurant () {
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('name', this.form.name)
        bodyFormData.append('type', this.form.type)
        bodyFormData.append('address', this.form.address)
        bodyFormData.append('telephone', this.form.telephone)

        await axios({
          method: 'post',
          url: 'http://localhost:8080/api/restaurant/register',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
          this.list = Array(response.data.data)
          if (this.list !== undefined) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.dialogVisible = false
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    handleEdit (index, row) {
      this.titleCard = 'Edit a new Restaurant'
      this.activeForm = true
      this.isEdit = true
      this.form = _.cloneDeep(row)
    },
    handleDelete (index, row) {
      this.$confirm('This will permanently delete the restaurant. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteRestaurant(row.id).then(() => {
          this.list.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    async deleteRestaurant (id) {
      try {
        await axios({
          method: 'delete',
          url: 'http://localhost:8080/api/restaurant/delete/' + id
        }).then((response) => {
          if (response.data.data !== undefined) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    handleClose (done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    goToLogout () {
      this.$router.push({ name: 'home' })
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
