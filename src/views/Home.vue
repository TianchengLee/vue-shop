<template>
  <div class="home">
    <!-- 头部搜索 -->
    <van-row gutter="0" class="searchBox" style="width:100%;">
      <van-col span="3" class="category">
        <router-link to="/category">
          <van-icon name="label-o"/>
        </router-link>
      </van-col>
      <van-col span="18" class="searchForm">
        <van-search
          v-model="searchKeys"
          style="background:white;height:32px;border-radius:22px;border:1px solid #ccc;"
          placeholder="大家在搜索：衣服"
          @click.stop
          @keydown.enter="getGoodsListByKeys(searchKeys)"
        />
      </van-col>
      <van-col span="3" class="login">
        <router-link to="/me/login">登录</router-link>
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
        <router-link :to="'/goodsList?id=' + item.id">
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
      searchKeys: "",
      active: 0,
      shopcarCount: this.$store.getters.getCount,
      bannerImages: [],
      cates: []
    };
  },
  name: "home",
  methods: {
    getGoodsListByKeys(keys) {
      if (!keys.trim()) return this.$toast("请输入搜索关键词!");
      this.$router.push({ path: "/goodsList", query: { keys } });
    }
  },
  created() {
    this.$http.get("/v1/home/getBanners").then(res => {
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
  },
  mounted() {
    var banner = document.querySelector(".van-swipe");
    var search = document.querySelector(".searchBox");
    window.onscroll = function() {
      var bannerHeight = banner.offsetHeight;
      var offsetTop =
        document.scrollTop || document.body.scrollTop || document.documentElement.scrollTop;
      var opacity = 0;
      if (offsetTop < bannerHeight) {
        opacity = offsetTop / bannerHeight;
        search.style.backgroundColor = "rgba(255,255,255," + opacity + ")";
      }
    };
  },
  destroyed() {
    window.onscroll = null;
  }
};
</script>
<style lang="less" scoped>
// @import '../assets/css/home.less';
.home {
  padding-bottom: 50px;
  .searchBox {
    padding-top: 5px;
    position: fixed;
    z-index: 999;
    .login,
    .category {
      text-align: center;
      line-height: 35px;
    }
    .category {
      a {
        display: block;
        padding-top: 3px;
      }
      .van-icon-label-o {
        font-size: 18px;
      }
    }
    .searchForm {
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