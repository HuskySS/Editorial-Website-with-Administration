<template>
  <div>
    <h1>Managers</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="username" label="username"></el-table-column>
      <el-table-column fixed="right" label="operation" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
          >
            edit
          </el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row._id)"
          >
            delelte
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/admin_users')
      this.items = res.data
    },
    remove(id) {
      this.$confirm('Are you sure you want to delete the administrator?', 'prompt', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`rest/admin_users/${id}`)
          this.$message({
            type: 'success',
            message: 'delete success!',
          })
          this.fetch()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled deletion',
          })
        })
    },
  },
  created() {
    this.fetch()
  },
}
</script>
