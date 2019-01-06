<template>
<div>
    <van-address-list
    v-model="chosenAddressId"
    :list="addressList"
    @add="onAdd"
    @edit="onEdit"
    />
</div>
</template>

<script>
export default {
    data(){
        return {
            chosenAddressId: '1',
            addressList: [],
        }
    },
    created(){
        this.$http.get('/v1/users/getReceiverAddress').then(res=>{
            // console.log(res);
            if(res.data.status==200){
                // this.addressList = res.data.data
                res.data.data.forEach((value,index)=>{
                    this.addressList.push({
                        id: value.id,
                        name: value.receiver_name,
                        tel: value.mobile,
                        address: value.province+value.city+value.area+value.detailed_address
                    })
                })
            }
        })
    },
    methods: {
        onAdd() {
            this.$router.push('/me/addressAdd');
        },
        onEdit(item, index){
           this.$router.push('/me/addressEdit/'+item.id)
        }
    }
    
}
</script>

<style lang="less" scoped>

</style>
