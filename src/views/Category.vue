<template>
  <div class="category">
    <!-- Tab 标签滑块 -->
    <van-tabs sticky @click="getSecondCategories">
      <van-tab v-for="(item,index) in category" :title="item.name" :key="index" class="tab subCate">
        <!-- <div class="subCate">
          <img src="../assets/images/bg.jpg" alt="" @click="goList(item.id)" v-for="(item,index) in imgList" :key="index">
        </div>-->
        <!-- <ul class="subCate">
          <li @click="goList(item.id)" v-for="(item,index) in imgList" :key="index">
            <img :src="item.img">
            <span>{{item.name}}</span>
          </li>
        </ul>-->
        <div class="subCate-item" @click="goList(item.id)" v-for="item in imgList" :key="item.id">
          <img :src="item.img">
          <span>{{item.name}}</span>
        </div>
      </van-tab>
    </van-tabs>

    <!-- tabBar -->
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
      active: 1,
      category: [],
      imgList: [],
      shopcarCount: this.$store.getters.getCount,
      loading: false,
      finished: false
    };
  },
  created() {
    this.$http
      .get("/v1/goods/getGoodsCategories")
      .then(res => {
        if (res.data.status == 200) {
          this.category = res.data.data;

          return this.$http.get(
            "/v1/goods/getGoodsSubCategories/" + this.category[0].id
          );
        }
      })
      .then(res => {
        if (res.data.status == 200) {
          this.imgList = res.data.data;
        }
      });
  },
  methods: {
    goList(id) {
      this.$router.push({ path: "/goodsList", query: { id } });
    },
    getSecondCategories(index, title) {
      const categoryId = this.category[index]["id"];
      this.$http
        .get("/v1/goods/getGoodsSubCategories/" + categoryId)
        .then(res => {
          if (res.data.status == 200) {
            this.imgList = res.data.data;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.category {
  padding-bottom: 50px;
  .subCate {
    width: 100%;
    padding: 10px 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .subCate-item {
      position: relative;
      margin-bottom: 25px;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 5px #eaeaea;
      width: 160px;
      height: 200px;
      display: flex;
      flex-direction: column;
      img {
        display: block;
      }
      span {
        // position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        // background: rgba(0, 0, 0, 0.5);
        // color: white;
        // left: 0;
        // bottom: 0;
      }
    }
  }
}
</style>

