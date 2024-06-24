<template>
  <div>
    <m-top-handle
      title="title"
      content="Write a blog"
      path="/articles/create/"
    ></m-top-handle>
    <h1>Article List</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="title"></el-table-column>
      <el-table-column prop="createdAt" label="Creation time">
        <template scope="scope">
          {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="Last update time">
        <template scope="scope">
          {{ scope.row.updatedAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="operation" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
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
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    remove(id) {
      this.$confirm('Are you sure you want to delete this article?', 'prompt', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`rest/articles/${id}`)
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
