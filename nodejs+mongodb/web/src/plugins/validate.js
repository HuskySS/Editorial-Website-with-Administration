import reg from "./reg";

//验证手机号码

export const validateQQEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入QQ邮箱'))
  } else if (!reg.qqEmail.test(value)) {
    callback(new Error('@qq.com'));
  } else {
    callback();
  }
}
//邮箱验证
export const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱"));
  } else if (!reg.email.test(value)) {
    callback(new Error("邮箱格式错误"));
  } else {
    callback();
  }
};