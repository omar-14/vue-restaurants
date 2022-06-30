<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" plain @click="goToCreateItem"
          >Primary</el-button
        >
      </el-col>
      <el-col>
        <el-button type="success" plain @click="goToPuchaseItem"
          >Success</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {},
  methods: {
    goToCreateItem () {
      this.$router.push({ name: 'create.item' })
    },
    goToPuchaseItem () {
      this.$router.push({ name: 'create.item' })
    }
  }
}
</script>
