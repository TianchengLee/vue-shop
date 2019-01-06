<template>
    <div>
        <van-cell-group>
        <van-field
            v-model="mobile"
            type="text"
            label="电话"
            required
        />
        </van-cell-group>
     <van-button type="warning" size="large" @click="modify">确定修改</van-button>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            mobile:'',
        };
    },
    methods: {
        modify(){
          const account = {
              mobile:this.mobile
          }
          const accountStr = qs.stringify(account);
          this.$http.post("/v1/users/updateUserInfo",accountStr).then(res=>{
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
