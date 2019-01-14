<template>
  <div>
    <van-cell-group>
      <van-cell :value="'用户名称:' + (userInfo.username || '')"/>
      <van-cell :value="'用户手机:' + (userInfo.mobile || '')"/>
      <van-cell value="修改手机" @click="account"/>
      <van-cell value="密码重置" @click="redirect('PwdReset')"/>
      <van-cell value="我的地址" @click="redirect('AddressList')"/>
    </van-cell-group>

    <van-button class="logout" type="danger" size="large" @click="logout">退出</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.$http.get("/v1/users/getUserInfo").then(res => {
      // console.log(res)
      if (res.data.status == 200) {
        this.userInfo = res.data.data;
      }
    });
  },
  methods: {
    redirect(str) {
      if (str == "PwdReset") {
        this.$router.push("/me/pwdReset");
      } else if (str == "AddressList") {
        this.$router.push("/me/addressList");
      }
    },
    account() {
      this.$router.push("/me/account");
    },
    logout() {
      localStorage.setItem("token", "");
      this.$router.push("/me/login");
    }
  }
};
</script>

<style lang="less" scoped>
.logout {
  width: 90%;
  margin-top: 50px;
}
</style>
