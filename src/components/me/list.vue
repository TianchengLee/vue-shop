<template>
<div>
    <div class="user">
        <div class="pic">
           <img src="../../assets/images/default.jpg" alt="">
        </div>
        <div class="info">
          <p>用户名称:{{userInfo.username}}</p>
          <p>用户手机:{{userInfo.mobile}}</p>
        </div>
        <div class="account">
          <a href='javascript:;' @click="account">账号管理</a>
        </div>
    </div>

    <van-cell-group>
      <van-cell value="我的订单" @click="redirect('MyOrder')"/>
      <van-cell value="密码重置" @click="redirect('PwdReset')"/>
      <van-cell value="我的地址" @click="redirect('AddressList')"/>
    </van-cell-group>

    <van-button type="danger" size="large" @click="logout">退出</van-button>
</div>
</template>

<script>
export default {
  data(){
    return {
      userInfo:{}
    }
  },
  created(){
    this.$http.get('/v1/users/getUserInfo').then(res=>{
      // console.log(res)
      if(res.data.status==200){
        this.userInfo = res.data.data;
      }
    })
  },
  methods:{
    redirect(str){
      if(str=="MyOrder"){
        this.$router.push("/me/myorder")
      }else if(str=="PwdReset"){
        this.$router.push("/me/pwdReset")
      }else if(str=="AddressList"){
        this.$router.push("/me/addressList")
      }
    },
    account(){
      this.$router.push('/me/account')
    },
    logout(){
      localStorage.setItem('token','');
      this.$router.push('/me/login');
    }
  }
}
</script>

<style lang="less" scoped>
  .user{
    background:url(../../assets/images/bg.jpg) no-repeat center center;
    height: 200px;
    width: 100%;
    background-size: cover;
    display:flex;
    color:white;
    font-size: 13px;
    .pic{
      width:100px;
      height: 100%;
      position: relative;
      img{
        position: absolute;
        border-radius: 50%;
        width: 50px;
        height:50px;
        top:50%;
        left:50%;
        transform:translate(-50%,-65%);
      }
    }
    .info{
      flex:2;
      text-align:left;
      padding-top:50px;
      p{
        height:20px;
      }
    }
    .account{
      flex:1;
      padding-top:20px;
      a{
        color:white;
      }
    }
  }

  button{
    width:90%;
    margin-top:50px;
  }
</style>
