<template>
<div>
    <van-nav-bar
    title="购物车"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />

    <ul class="shopcarList">
        <li v-for="(item,index) in shopcarList" :key="index">
            <!-- <van-switch v-model="checked" /> -->
            <div class="img">
                <img :src="item.small_img[0]" alt="">
            </div>
            <div class="info">
                <p>{{item.name}}</p>
                <p>
                    <span>{{item.sale_price}}</span>
                    <span><van-stepper v-model="item.count" @change="numberChange(item.id,item.count)"/></span>
                </p>
                <p><van-button size="mini" type="danger" @click="delFromShopcar(item.id)">删除</van-button></p>
            </div>
        </li>
    </ul>
   

    <van-submit-bar
    :price="totalPrice"
    button-text="提交订单"
    @submit="onSubmit"
    />
</div>
</template>

<script>

export default {
    data(){
        return {  
            checked: true,
            shopcarList:[],
        }
    },
    created(){
        this.getShopcarList()
    },
    methods:{
        getShopcarList(){
            var info = {
                page: 1,
                pageSize: 1000
            }
            this.$http.get('v1/cart/getGoodsFromCart', { params: info }).then(res => {
                if (res.data.status == 200) {
                    res.data.data.forEach(function (value, index) {
                    value.small_img = value.small_img.split(',')
                    })
                    this.shopcarList = res.data.data
                }
            })
        },
        delFromShopcar(id){
           this.$http.get('/v1/cart/deleteGoodsFromCart/'+id).then(res=>{
            //    console.log(res);
            if(res.data.status==200){
                this.getShopcarList()
            }
           })
        },
        numberChange(id,number){
            this.$http.post('v1/cart/postGoodsToCart/'+id,{count:number})
            .then(res=>{
                if(res.data.status==200){
                    this.getShopcarList()
                }
            })
        },
        onClickLeft(){
            this.$router.go(-1);
        },
        onSubmit(){
            this.$toast('提交');
        }
   },
   computed:{
       totalPrice:function(){
           var sum = 0;
           this.shopcarList.forEach((value,index)=>{
               sum +=value.count*value.sale_price
           })
           return sum*100;
       }
   }
}
</script>

<style lang="less" scoped>
.shopcarList{

    li{
        display:flex;
        border-bottom:1px solid #ccc;
        height:150px;

        .van-switch{
           align-self: center;
        }
        .img{
            width: 150px;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            flex:1;
            padding:10px;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            p{
                margin:0;
                padding:0;
                width: 100%;
            }
            p:nth-of-type(1){
                font-weight: bolder;
                font-size: 18px;
                text-align: left;
            }
            p:nth-of-type(2){
                display:flex;
                justify-content: space-between;
                span:nth-of-type(1){
                    color:red;
                    font-size: 20px;
                }
            }
            p:nth-of-type(3){
                text-align: right;
            }
        }   
    }
}
</style>

