<template>
  <div class="me">
    <van-nav-bar title="个人中心" :left-text="str" :left-arrow="flag" @click-left="onClickLeft"/>

    <router-view/>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="search" to="/news">新闻</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 4,
      flag: false,
      str: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (
        newVal === "/me/pwdReset" ||
        newVal === "/me/addressList" ||
        newVal === "/me/myorder"
      ) {
        this.flag = true;
        this.str = "返回";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.me {
  padding-bottom: 50px;
}
</style>

