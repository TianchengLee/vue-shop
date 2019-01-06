<template>
    <div>
        <van-cell-group>
        <van-field
            v-model="oldPwd"
            type="password"
            label="旧密码"
            placeholder="请输入旧密码"
            required
        />
        <van-field
            v-model="newPwd"
            type="password"
            label="新密码"
            placeholder="请输入新密码"
            required
        />
    </van-cell-group>
     <van-button type="warning" size="large" @click="changePwd">确定修改</van-button>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            oldPwd:'',
            newPwd:'',
        };
    },
    methods: {
        changePwd(){
          const pwd = {
              oldPassword:this.oldPwd,
              newPassword:this.newPwd
          }
          const pwdStr = qs.stringify(pwd);
          this.$http.post("/v1/users/updatePassword",pwdStr).then(res=>{
            if(res.data.status==200){
                this.$toast.success('修改成功');
                setTimeout(()=>{
                    this.$router.push('/me/list');
                },1000) 
            }else{
                 this.$toast.fail('修改失败');
            }
          })
       }
    }
}
</script>

<style lang="less" scoped>
    button{
        margin:10px 20px;
        width:90%;
        border-radius: 8px;
    }
</style>
