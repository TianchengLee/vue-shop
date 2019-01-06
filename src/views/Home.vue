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
            @click.stop=""
          />
        </form>
      </van-col>
      <van-col span="2"  class="classfic">
        <van-icon name="qr"/>
      </van-col>
    </van-row>

    <!--轮播图组件  -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in bannerImages" :key="index">
        <img :src="item.img" style="width:100%"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 商品导航 -->
    <ul class="nav">
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_1.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_2.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_3.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_4.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_5.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_6.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_7.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
        <li>
            <a href="javascript:;">
                <img src="../assets/images/nav_8.png" alt="">
                <p>商品分类</p>
            </a>
        </li>
    </ul>

    <!-- 分类tabBar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="pending-evaluate" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="search" dot to="/news">新闻</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/shopcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/me">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data(){
    return {
      value:"",
      active:0,
      shopcarCount:this.$store.getters.getCount,
      bannerImages: []
    }
  },
  name: 'home',
  created(){
    this.$http.get('v1/home/getBanners').then(res=>{
      // console.log(res);
      if(res.data.status==200){
        this.bannerImages = res.data.data;
      }
    })
  }
}
</script>
<style lang="less" scoped>
// @import '../assets/css/home.less';
.home{
  .searchBox{
    margin:5px auto;

    .register{
    text-align: center;
    line-height: 35px;
    padding-left:20px!important;
    }
    .searchForm{
      padding:0!important;
    }
    .classfic{
      text-align: center;
      line-height: 35px;
    }
  }
  .nav{
    padding:5px;
    display:flex;
    flex-wrap:wrap;
    li{
      width:25%;
      img{
        width:50%;
      }
      p{
        font-size: 13px;
        color:#888;
        padding: 0;
        margin:0;
      }
    }
  }
}
</style>