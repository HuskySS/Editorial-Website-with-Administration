<template>
  <div class="fromInput">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="nickName">
        <el-input
          size="medium"
          :maxlength="10"
          v-model="userForm.nickName"
          :placeholder="isUpload ? 'name' : 'give us your nickname～'"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" v-if="isUpload">
        <el-input
          size="medium"
          v-model="userForm.email"
          placeholder="email(@xx.com)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="qqEmail" v-else>
        <el-input
          size="medium"
          v-model="userForm.qqEmail"
        ></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <el-input
          size="medium"
          v-model="userForm.url"
          placeholder="http:// or https://)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="description" v-if="isUpload">
        <el-input
          size="medium"
          type="textarea"
          :maxlength="30"
          v-model="userForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item size="medium" prop="avatarImg" v-if="isUpload">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :limit="1"
          :on-success="(res) => $set(userForm, 'avatarImg', res.url)"
        >
          <img
            v-if="userForm.avatarImg"
            :src="userForm.avatarImg"
            class="logo-img"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="width-100" @click="saveForm('userForm')">
    </el-button>
  </div>
</template>

<script>
import {
  validateEmail,
} from '../plugins/validate'
export default {
  props: {
    isUpload: { type: Boolean, default: false },
    toForm: { type: Object, default: null },
  },
  data() {
    return {
      userForm: {
        nickName: '',
        email: '',
        qqEmail: '',
        url: '',
        description: '',
        avatarImg: '',
        isRead: false,
      },
      userRules: {
        nickName: {
          required: true,
          message: 'max 10letters',
          trigger: 'change',
        },
        email: { required: true, validator: validateEmail, trigger: 'change' },
        qqEmail: {
          required: true,
          trigger: 'change',
        },
      },
    }
  },
  watch: {
    isUpload(newV) {
      this.setUserRules(newV)
    },
  },
  created() {
    this.userForm = this.toForm ? this.toForm : this.userForm
    this.setUserRules(this.isUpload)
  },
  methods: {
    saveForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        this.userForm.email = this.userForm.qqEmail
        if (valid) {
          this.$emit('toRequest', this.userForm)
        } else {
          return false
        }
      })
    },
    setUserRules(isUpload) {
      if (isUpload) {
        this.userRules.description.required = true
        this.userRules.avatarImg.required = true
        this.userRules.email.required = true
        return
      }
      this.userRules.description.required = false
      this.userRules.avatarImg.required = false
      this.userRules.qqEmail.required = false
      this.userRules.url.required = false
    },
    readInfo() {
      // console.log(this.$parent)
      // this.$parent.turnAnima = true
      // console.log(this.$parent.turnAnima)
    },
  },
}
</script>

<style lang="scss" scoped>
.read-text {
  border-bottom: 1px solid #000;
  &:hover {
    border-color: #8600ff;
    color: #8600ff;
  }
}
.isRead {
  border-bottom: 1px solid #ffb929;
}
.avatar-uploader {
  height: 62px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}
.logo-img {
  width: 60px;
  height: 60px;
  display: block;
}
.el-form-item {
  margin-bottom: 18px !important;
}
</style>
