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
          <el-button type="info" class="button-home" plain><b>Logout</b></el-button>
          <el-button
            type="success"
            style="margin-top: 1rem;"
            @click="handleRegister"
            plain><b>Register a new Restaurant</b></el-button>
          <!-- <el-button type="success" class="button-home" plain>Login</el-button> -->
        </el-col>
      </el-row>
    </el-card>
    <el-row style="margin-top: 2rem;" type="flex">
      <el-col :span="activeForm ? 14 : 24">
        <el-card style="margin-left: 1rem; margin-right: 1rem;">
          <el-table
            :data="tableData"
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
                  @click.native.prevent="handleEdit(scope.$index, tableData)"
                  type="warning"
                  size="mini">Edit</el-button>
                <el-button
                  @click.native.prevent="handleDelete(scope.$index, tableData)"
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
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign">
          <el-form-item
            label="Restaurant name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item
            label="Kind of food">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item
            label="Restaurant address">
            <el-input v-model="formLabelAlign.address"></el-input>
          </el-form-item>
          <el-form-item
            label="Restaurant telephone">
            <el-input v-model="formLabelAlign.telephone"></el-input>
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
            <el-col :span="5" v-if="isEdit">
              <el-button
                type="warning"
                @click="handleEdit"
                class="button"
                icon="el-icon-collection-tag">Save</el-button>
            </el-col>
            <el-con :span="5" v-else>
              <el-button
                type="success"
                class="button"
                icon="el-icon-plus">Register</el-button>
            </el-con>
          </el-row>
        </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeForm: false,
      isEdit: true,
      titleCard: '',
      userCard: 'Omar Ramos',
      tableData: [{
        name: '2016-05-03',
        type: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        telephone: '555555555'
      }, {
        name: '2016-05-03',
        type: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        telephone: '555555555'
      }, {
        name: '2016-05-03',
        type: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        telephone: '555555555'
      }, {
        name: '2016-05-03',
        type: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        telephone: '555555555'
      }],
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleRegister () {
      this.titleCard = 'Register a new Restaurant'
      this.isEdit = false
      this.activeForm = true
    },
    handleEdit () {
      this.titleCard = 'Edit a new Restaurant'
      this.activeForm = true
      this.isEdit = true
    },
    handleDelete (index, rows) {
      this.$confirm('This will permanently delete the restaurant. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
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
