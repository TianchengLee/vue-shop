<template>
  <div class="goodsInfo">
    <van-nav-bar  fixed :title="goodsInfo.name" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="detail">
      <div class="img" @click="showImagePreview">
        <img :src="img" alt>
      </div>
      <div class="info">
        <div class="name">
          商品名称:
          <span>{{goodsInfo.name}}</span>
        </div>
        <div class="price">
          商品价格:
          <span>{{goodsInfo.sale_price}}</span>
        </div>
        <div class="number">购买数量:
          <van-stepper v-model="number"/>
        </div>
        <div class="text">商品描述: {{goodsInfo.description}}</div>
        <p>商品详情:</p>
        <div class="content" v-html="goodsInfo.content"></div>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn"/>
      <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="goShopcar"/>
      <van-goods-action-big-btn text="加入购物车" @click="addShopcar"/>
      <van-goods-action-big-btn primary text="立即购买" @click="onClickBigBtn"/>
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
    </van-goods-action>

    <!-- <transition
      @before-enter="beforeEnter"
      @enter="enter"
    @after-enter="afterEnter">-->
    <!-- </transition> -->
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      goodsId: this.$route.params.id,
      number: 1,
      goodsInfo: [],
      img: "",
      ballFlag: false
    };
  },
  created() {
    this.$http.get("/v1/goods/getGoodsInfo/" + this.goodsId).then(res => {
      if (res.data.status == 200) {
        this.goodsInfo = res.data.data;
        this.img = this.goodsInfo.big_img[0];
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickMiniBtn() {
      this.$toast("点击图标");
    },
    onClickBigBtn() {
      this.$toast("点击按钮");
    },
    addShopcar() {
      var token = localStorage.getItem("token");
      if (token) {
        this.$http
          .post("v1/cart/postGoodsToCart/" + this.goodsId, {
            count: this.number
          })
          .then(res => {
            if (res.data.status == 200) {
              // this.$toast.success("添加到购物车成功")
              this.ballFlag = !this.ballFlag;
            }
          });
      } else {
        this.$dialog
          .confirm({
            title: "立即登录?"
          })
          .then(() => {
            this.$router.push("/me/login");
          })
          .catch(() => {
            return;
          });
      }
      // this.ballFlag = !this.ballFlag;

      // this.$store.commit('addToShopcar',{id:this.goodsId,count:this.number})
    },
    goShopcar() {
      this.$router.push("/shopcar");
    },
    showImagePreview() {
      ImagePreview(this.goodsInfo.big_img);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translateX(-100px)";
      el.style.transition = "all 2s cubic-bezier(0,1.57,.95,.01)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
      this.shopcarCount += this.number;
    }
  }
};
</script>

<style lang="less">
.goodsInfo {
  padding-top: 45px;
  .detail {
    .img {
      img {
        width: 100%;
        height: 300px;
      }
    }
    .info {
      padding: 5px;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      div {
        margin-top: 5px;
        span {
          color: red;
          font-size: 24px;
        }
      }
      .content {
        img {
          width: 100%;
        }
      }
      .van-stepper {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        margin-left: 30px;
      }
    }
  }
  .van-goods-action {
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      bottom: 18px;
      left: 40%;
    }
  }
}
</style>

