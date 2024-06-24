<template>
  <div>
    <div class="top-box">
      <strong>{{ title }}：</strong>
      <el-input
        class="search-input"
        :placeholder="`input${title}`"
        v-model="searchName"
      ></el-input>
      <el-button type="primary">search</el-button>
      <slot>
        <el-button type="primary" class="fr" @click="$router.push(path)">
          {{ content }}
        </el-button>
      </slot>
      <slot name="email"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ' title',
    },
    content: String,
    path: String,
  },
  data() {
    return {
      searchName: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.top-box {
  margin-bottom: 30px;
  .search-input {
    width: 300px;
    margin-right: 10px;
  }
}
</style>
