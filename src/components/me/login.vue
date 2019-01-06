<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        icon="question-o"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        clearable
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button type="danger" size="large" @click="login">登录</van-button>
    <div class="reg">未注册 ?
      <a href="javascript:;" @click="register">去注册</a>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$router.push("/me/register");
    },
    login() {
      const userInfo = {
        username: this.username,
        password: this.password
      };
      const userStr = qs.stringify(userInfo);
      this.$http.post("/v1/users/login", userStr).then(res => {
        if (res.data.status == 200) {
          this.$toast.success("登录成功");
          localStorage.setItem("token", res.data.data.token);
          setTimeout(() => {
            this.$router.push("/me/list");
          }, 1000);
        } else {
          this.$toast.fail("登录失败,请重新登录");
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  .van-cell {
    height: 50px;
    line-height: 30px;
  }
  .van-cell__title,
  .van-cell__value {
    font-size: 18px;
  }
  button {
    width: 80%;
    margin-top: 30px;
  }
  .reg {
    margin: 30px;
    text-align: right;
    padding-right: 30px;
    font-size: 20px;
    a {
      font-size: 24px;
      color: blue;
    }
  }
}
</style>

