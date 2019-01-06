<template>
<div class="register">
    <van-cell-group>
        <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
            @blur="checkUsername"
            ref="username"
        />
        <van-field
            v-model="nickname"
            required
            clearable
            label="昵称"
            placeholder="请输入用户名"
        />
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <van-field
            v-model="mobile"
            required
            clearable
            label="手机号码"
            placeholder="请输入手机号码"
        />
    </van-cell-group>
    <div class="vCode">
           <span class='text'>验证码</span>
           <input type="text" v-model="vCode" placeholder="请输入验证码">
           <span ref="vcodeSvg" class="vcodeSvg" @click="refreshCode"></span>
    </div>

    <van-button type="warning" size="large" @click="register">注册</van-button>
</div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant';
import qs from 'qs'
Vue.use(Toast);

export default {
    data(){
        return{
            username:"",
            nickname:"",
            password:"",
            mobile:"",
            vCode:""
        }
    },
    created(){
        this.showvCode();
    },
    methods:{
        showvCode(){
            this.$http.get('/v1/users/getVCode').then(res=>{
                if(res.status==200){
                    this.$refs.vcodeSvg.innerHTML = res.data;
                }
            })
        },
        refreshCode(){
            this.showvCode();
        },
        checkUsername(){
            // console.log(this.username);
            this.$http.get("/v1/users/checkUsername/"+this.username).then(res=>{
        
                if(res.data.status==200){
                    Toast('用户名可用')
                }else{
                    Toast('用户名不可用，请重新输入');
                    this.$refs.username.focus();
                    this.username='';
                }
            })
        },
        register(){
            const userInfo = {
                username:this.username,
                password:this.password,
                nickname:this.nickname,
                mobile:this.mobile,
                vCode:this.vCode
            };
            const userStr = qs.stringify(userInfo)
            this.$http.post("/v1/users/register",userStr).then(res=>{
                if(res.data.status==200){
                    Toast('注册成功')
                    localStorage.setItem("token",res.data.data.token);
                    setTimeout(function(){
                        this.$router.push('/me/list');
                    },1000) 
                }
            })

        }
    }
}
</script>

<style lang="less" scoped>
.register{

    .vCode{
        height:50px;
        line-height: 50px;
        padding-left:30px;
        font-size: 14px;
        text-align: left;
        input{
            border:none;
            width:50%;
            line-height: 50px;
            height: 50px;
            margin-left:35px;
        }
        svg{
            overflow: hidden;
        }
        
    }
    button{
        margin-top:50px;
        width:80%;
    }
}
</style>

