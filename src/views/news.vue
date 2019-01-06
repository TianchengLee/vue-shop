<template>
<div class="newsList">
      <!-- Tab 标签滑块 -->
   <van-tabs @click="onClick">
      <van-tab 
        v-for="(item,index) in newsCategory" 
        :title="item.name" 
        :key="index"
        class="tab">

        <!-- <div class="subCate">
          <img src="../assets/images/bg.jpg" alt="" @click="goList(item.id)" v-for="(item,index) in imgList" :key="index">
        </div> -->
        <ul class="subCate">
          <li @click="goNewsInfo(item.id)" v-for="(item,index) in newsList" :key="index">
            <div class="icon">
               <img :src="item.icon">
            </div>
            <div class="info">
              <div class="title">{{item.title}}</div>
              <div class="subtitle">
                <span>发表时间:{{item.ctime}}</span> 
                <span>点击次数:{{item.views}}</span>
              </div>
            </div>
          </li>
        </ul>
     
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
    data(){
      return {
          active:2,
          newsCategory:[],
          newsList:[]
      }
    },
    created(){
      this.$http.get("/v1/news/getNewsCategories").then(res=>{
          if(res.data.status==200){
            this.newsCategory = res.data.data;
            // console.log(this.newsCategory)
            let newsCategoryInfo = {
              cate:this.newsCategory[0].id,
              page:1,
              pageSize:10
            }
            this.$http.get('/v1/news/getNewsList', {params:newsCategoryInfo}).then(res=>{
              if(res.data.status==200){
                // console.log(res)
                this.newsList = res.data.data.news;
              }
            })
          }
      })
    },
    methods:{
      onClick(index, title) {
         let newsCategoryInfo = {
              cate:this.newsCategory[index].id,
              page:1,
              pageSize:10
            }
         this.$http.get('/v1/news/getNewsList', {params:newsCategoryInfo}).then(res=>{
              if(res.data.status==200){
                // console.log(res)
                this.newsList = res.data.data.news;
              }
            })
      },
      goNewsInfo(id){
        this.$router.push('/newsInfo/'+id);
      }
    }
}
</script>

<style lang="less" scoped>
.newsList{
  width:100%;
  .subCate{
    width:100%;
    // padding:3px;
    li{
      width:100%;
      border-bottom:1px solid #ccc;
      height:80px;
      padding:5px;
      display:flex;
      .icon{
        width:100px;
        height:100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        flex:1;
        padding:3px;
        text-align: left;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
          font-size: 14px;
        }
        .subtitle{
          font-size: 12px;
          display:flex;
          padding-right:10px;
          justify-content: space-between;
        }
      }
    }
   
  }
}
</style>

