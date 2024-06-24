<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            Content Management
          </template>
          <el-menu-item-group>
            <template slot="title">Classification</template>
            <el-menu-item index="/categories/create">Add Classification</el-menu-item>
            <el-menu-item index="/categories/list">Classification List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">Article</template>
            <el-menu-item index="/articles/create">Add Article</el-menu-item>
            <el-menu-item index="/articles/list">Article List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">Article Comments</template>
            <el-menu-item index="/comments/list">Comments List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title"> Users</template>
            <el-menu-item index="/users/list">User list</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>
            System settings
          </template>
          <el-menu-item-group>
            <template slot="title">Administrators</template>
            <el-menu-item index="/admin_users/create">Add Administrator</el-menu-item>
            <el-menu-item index="/admin_users/list">Administrators List</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>{{ username }}</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-left: 10px"></i>
          <el-dropdown-menu slot="dropdown" @click="logout">
            <el-dropdown-item>
              <a @click="logout">quit</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: #69a8e7;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
  created() {
    this.username = localStorage.getItem('username') || ''
  },
}
</script>
