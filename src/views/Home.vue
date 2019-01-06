<template>
  <div class="home">
    <!-- 头部搜索 -->
    <van-row gutter="20" class="searchBox" style="width:100%;">
      <van-col span="4" class="register">
        <a href="#">登录</a>
      </van-col>
      <van-col span="18" class="searchForm">
        <form action="/">
          <van-search
            v-model="value"
            style="background:white;height:35px;border-radius:22px;border:1px solid #ccc;"
            placeholder="大家在搜索：衣服"
            @click.stop
          />
        </form>
      </van-col>
      <van-col span="2" class="classfic">
        <van-icon name="qr"/>
      </van-col>
    </van-row>

    <!--轮播图组件  -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in bannerImages" :key="index">
        <img :src="item.img" style="width:100%">
      </van-swipe-item>
    </van-swipe>

    <!-- 商品导航 -->
    <ul class="nav">
      <li v-for="item in cates" :key="item.id">
        <router-link :to="'/goodsList/' + item.id">
          <img :src="item.img" alt>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>

    <!-- 分类tabBar -->
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      value: "",
      active: 0,
      shopcarCount: this.$store.getters.getCount,
      bannerImages: [],
      cates: []
    };
  },
  name: "home",
  created() {
    this.$http.get("v1/home/getBanners").then(res => {
      // console.log(res);
      if (res.data.status == 200) {
        this.bannerImages = res.data.data;
      }
    });
    let pageInfo = {
      page: 1,
      pageSize: 100
    };
    this.$http
      .get("/v1/goods/getGoodsSubCategories", { params: pageInfo })
      .then(res => {
        if (res.data.status === 200) {
          this.cates = res.data.data.cates;
        }
      });
  }
};
</script>
<style lang="less" scoped>
// @import '../assets/css/home.less';
.home {
  .searchBox {
    margin: 5px auto;

    .register {
      text-align: center;
      line-height: 35px;
      padding-left: 20px !important;
    }
    .searchForm {
      padding: 0 !important;
    }
    .classfic {
      text-align: center;
      line-height: 35px;
    }
  }
  .nav {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      margin: 10px 0;
      img {
        width: 50%;
      }
      p {
        font-size: 13px;
        color: #888;
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>