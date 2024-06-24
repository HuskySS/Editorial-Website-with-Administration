<template>
  <div>
    <h1>{{ id ? 'edit' : 'add' }}article</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="Classification">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="thumbnail">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="(res) => $set(model, 'icon', res.url)"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="detail">
        <div>
          <mavon-editor
            code_style="monokai-sublime"
            :ishljs="true"
            ref="mavon"
            v-model="model.body"
            @imgAdd="$imgAdd"
          ></mavon-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Create',
  components: {
    mavonEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      categories: [],
      body: '',
    }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: 'save success',
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    $imgAdd(pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.$http.post('upload', formData).then((res) => {
        this.$refs.mavon.$img2Url(pos, res.data.url)
      })
    },
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
}
</script>
