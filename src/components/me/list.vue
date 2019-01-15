<template>
  <div>
    <div class="avatar-container">
      <img src="@/assets/images/avatar.png" alt="">
    </div>
    <van-cell-group>
      <van-cell :value="'用户名:' + (userInfo.username || '')"/>
      <van-cell :value="'昵称:' + (userInfo.nickname || '')"/>
      <van-cell :value="'手机:' + (userInfo.mobile || '')"/>
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
.avatar-container {
  padding: 30px 0;
  img {
    width: 100px;
    height: 100px;
  }
}
.logout {
  width: 90%;
  margin-top: 50px;
}
</style>
