<template>
  <div>
    <h1>Classification List</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="480"></el-table-column>
      <el-table-column prop="name" label="Classification name"></el-table-column>
      <el-table-column fixed="right" label="operation" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >
            edit
          </el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row._id)"
          >
            delete
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
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove(id) {
      this.$confirm('Are you sure you want to delete this category?', 'prompt', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`rest/categories/${id}`)
          this.$message({
            type: 'success',
            message: 'delete success!',
          })
          await this.fetch()
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
