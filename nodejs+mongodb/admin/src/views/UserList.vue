<template>
  <div>
    <m-top-handle title="Nickname" content="Add User"></m-top-handle>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column type="index" label="Number" width="150"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="avatarImg" label="Avatar">
        <template slot-scope="scope">
          <img :src="scope.row.avatarImg" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="NickName"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="url" label="Blog"></el-table-column>
      <el-table-column label="operation" min-width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/editor/${scope.row._id}`)"
          >
            edit
          </el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">
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
      tableData: [],
      title: '',
      multipleSelection: [],
      emailArr: [],
      form: {
        sendContent: '',
      },
      formRules: {},
      dialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await this.$http.get('/rest/users')
      this.tableData = res.data
    },
    deleteHandle(data) {
      this.$confirm(`Are you sure you want to delete the message: ${data.content} ?`, 'prompt', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`/rest/users/${data._id}`)
          await this.getList()
          this.$message({
            type: 'success',
            message: 'delete success!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled deletion',
          })
        })
    },
  },
}
</script>
