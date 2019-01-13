<template>
  <div class="goodsList">
    <van-nav-bar fixed :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <scroll
      class="wrapper"
      :data="goodsList"
      :pullup="true"
      :pulldown="true"
      :loadMoreLoading="loadMoreLoading"
      :finished="finished"
      @scrollToEnd="loadMore"
      @pulldown="referesh"
    >
      <div v-if="refereshLoading" class="top-tip">正在刷新
        <van-loading type="spinner"/>
      </div>
      <div class="content items">
        <div class="item" @click="goInfo(item.id)" v-for="(item,index) in goodsList" :key="index">
          <img :src="item.cover_img" alt>
          <p>
            商品名称:
            <span>{{item.name}}</span>
            <br>市场价:
            <span>{{item.sale_price}}</span>
          </p>
        </div>
        <div v-if="loadMoreLoading" class="bottom-tip">正在加载
          <van-loading type="spinner"/>
        </div>
        <div v-if="finished" class="bottom-tip">加载完成了!</div>
      </div>
    </scroll>

    <!-- <div class="wrapper" ref="wrapper">
      <div class="content items">
        <div class="item" @click="goInfo(item.id)" v-for="(item,index) in goodsList" :key="index">
          <img :src="item.cover_img" alt>
          <p>
            商品名称:
            <span>{{item.name}}</span>
            <br>市场价:
            <span>{{item.sale_price}}</span>
          </p>
        </div>
      </div>
    </div>-->
    <!-- <van-list
      class="items"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getGoodsList"
      :immediate-check="false"
    >
      <div class="item" @click="goInfo(item.id)" v-for="(item,index) in goodsList" :key="index">
        <img :src="item.cover_img" alt>
        <p>
          商品名称:
          <span>{{item.name}}</span>
          <br>市场价:
          <span>{{item.sale_price}}</span>
        </p>
      </div>
    </van-list>-->
    <!-- <div class="items">
      <div class="item" @click="goInfo(item.id)" v-for="(item,index) in goodsList" :key="index">
        <img :src="item.cover_img" alt>
        <p>
          商品名称:
          <span>{{item.name}}</span>
          <br>市场价:
          <span>{{item.sale_price}}</span>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import scroll from "../components/common/scroll";

export default {
  data() {
    return {
      id: 0,
      title: "商品列表",
      keys: "",
      goodsList: [],
      refereshLoading: false,
      loadMoreLoading: false,
      finished: false,
      page: 1,
      scroll: null
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.title || "商品列表";
    this.keys = this.$route.query.keys || "";
    if (this.keys.trim()) this.title = this.keys;

    this.getGoodsList();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goInfo(id) {
      this.$router.push("/goodsInfo/" + id);
    },
    // _initScroll() {
    //   if (!this.scroll) {
    //     this.scroll = new BScroll(this.$refs.wrapper, {
    //       click: false
    //     });
    //     this.scroll.on("touchend", pos => {
    //       console.log('下拉动作')
    //       if (pos.y > 50) {
    //         this.getGoodsList();
    //       }
    //     });
    //   } else {
    //     this.scroll.refresh();
    //   }
    // },
    getGoodsList() {
      this.$http
        .get("/v1/goods/getGoodsList", {
          params: {
            cateId: this.id,
            keys: this.keys,
            page: this.page,
            pageSize: 10
          }
        })
        .then(res => {
          if (res.data.status == 200) {
            this.goodsList = this.goodsList.concat(res.data.data.goods);
            if (this.refereshLoading) {
              this.refereshLoading = false;
            }
            if (this.loadMoreLoading) {
              this.loadMoreLoading = false;
            }
            if (this.goodsList.length >= res.data.data.totalCount) {
              this.finished = true;
            }
          }
        });
    },
    referesh() {
      this.page = 1;
      this.refereshLoading = true;
      this.finished = false;
      this.goodsList = [];
      this.getGoodsList();
    },
    loadMore() {
      if (this.finished || this.refereshLoading) return;
      this.page++;
      this.loadMoreLoading = true;
      this.getGoodsList();
    }
  },
  // watch: {
  //   goodsList() {
  //     this.$nextTick(() => {
  //       this._initScroll();
  //     });
  //   }
  // }
  components: {
    scroll
  }
};
</script>

<style lang="less">
.goodsList {
  // padding-top: 50px;
  .items {
    padding: 3px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 100%;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 5px #eaeaea;
      margin: 3px;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        margin: 0;
        padding: 0;
        font-size: 13px;
        // font-weight: bold;
        span {
          // color: red;
        }
      }
    }
  }
  // .wrapper {
  //   height: 100%;
  //   width: 100%;
  //   position: absolute;
  //   top: 45px;
  //   overflow: hidden;
  //   z-index: 1;
  // }
  // .content {
  //   // height: 100%;
  //   padding-bottom: 45px;
  // }
  .van-list__loading,
  .van-list__finished-text {
    width: 100%;
  }
}
</style>

