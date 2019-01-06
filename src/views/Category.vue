<template>
<div class="category">
      <!-- Tab 标签滑块 -->
    <van-tabs @click="onClick">
      <van-tab 
        v-for="(item,index) in category" 
        :title="item.name" 
        :key="index"
        class="tab">

        <!-- <div class="subCate">
          <img src="../assets/images/bg.jpg" alt="" @click="goList(item.id)" v-for="(item,index) in imgList" :key="index">
        </div> -->
        <ul class="subCate">
          <li @click="goList(item.id)" v-for="(item,index) in imgList" :key="index">
            <img :src="item.img">
            <span>{{item.name}}</span>
          </li>
        </ul>
     
      </van-tab>
    </van-tabs>   

       <!-- tabBar -->
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
export default {
    data(){
      return {
          active:1,
          category:[],
          imgList: [],
          shopcarCount:this.$store.getters.getCount,
          loading: false,
          finished: false
      }
    },
    created(){
     
      this.$http.get("/v1/goods/getGoodsCategories").then(res=>{
       
        if(res.data.status==200){
            this.category = res.data.data;

            this.$http.get("/v1/goods/getGoodsSubCategories/"+this.category[0].id).then(res=>{
            if(res.data.status==200){
               this.imgList = res.data.data;
            }
        })
        }

      })
    },
    methods:{
      onLoad() {},
      goList(id){
         this.$router.push("/goodsList/"+id)
      },
      onClick(index, title) {
        const categoryId = this.category[index]['id'];
        this.$http.get("/v1/goods/getGoodsSubCategories/"+categoryId).then(res=>{
            if(res.data.status==200){
               this.imgList = res.data.data;
            }
        })
      }
    },

}
</script>

<style lang="less" scoped>
.category{
  .subCate{
    width:100%;
    li{
      position: relative;
      margin-bottom:3px;
      img{
        width: 100%;
        height: 300px;
        display:block;
      }
      span{
        position: absolute;
        width:100%;
        height: 40px;
        line-height: 40px;
        background: rgba(0,0,0,.5);
        color:white;
        left:0;
        bottom:0
      }
    }
  }
}
</style>

