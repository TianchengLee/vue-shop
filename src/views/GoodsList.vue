<template>
  <div class="goodsList">
    <van-nav-bar title="商品列表" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <div class="items">
      <div class="item" @click="goInfo(item.id)" v-for="(item,index) in goodsList" :key="index">
        <img :src="item.cover_img" alt>
        <p>
          商品名称:
          <span>{{item.name}}</span>
        </p>
        <p>
          市场价:
          <span>{{item.sale_price}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    const id = this.$route.query.id;
    const keys = this.$route.query.keys || "";
    this.$http
      .get("/v1/goods/getGoodsList", {
        params: {
          cateId: id,
          keys,
          page: 1,
          pageSize: 10
        }
      })
      .then(res => {
        if (res.data.status == 200) {
          this.goodsList = res.data.data.goods;
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goInfo(id) {
      this.$router.push("/goodsInfo/" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.goodsList {
  .items {
    padding: 3px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 48%;
      border: 1px solid #ccc;
      margin-left: 5px;
      margin-bottom: 3px;
      box-shadow: 1px 1px 3px #ccc;
      background-color: skygreen;
      font-size: 16px;
      text-align: left;
      img {
        width: 100%;
      }
      p {
        margin: 0;
        padding: 0;
        span {
          color: red;
          font-size: 18px;
        }
      }
    }
  }
}
</style>

