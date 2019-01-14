<template>
  <div class="register">
    <van-cell-group>
      <van-field v-model="receiver_name" required clearable label="收货人" placeholder="请输入用户名"/>
      <van-field v-model="mobile" required clearable label="手机号" placeholder="请输入手机号"/>
      <van-field v-model="postcode" label="邮编" placeholder="请输入邮编" required/>
      <van-field
        v-model="pro_city_area"
        label="省市区"
        placeholder="请输入省/市/区"
        required
        readonly
        @focus="show=true"
        @tap="show=true"
        @click="show=true"
      />
      <van-field v-model="address" label="详细地址" placeholder="详细地址" required/>
    </van-cell-group>
    <van-checkbox checked-color="#07c160" class="common-used" v-model="common_used">是否为常用收货人</van-checkbox>
    <!-- 省市区三级联动弹出框 -->
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel"/>
    </van-popup>

    <van-button type="warning" size="large" @click="addressAdd">添加新收货地址</van-button>
  </div>
</template>

<script>
import qs from "qs";
import areaList from "../../assets/address.js";
export default {
  data() {
    return {
      receiver_name: "",
      mobile: "",
      postcode: "",
      pro_city_area: "",
      show: false, //省市区三级联动是否显示
      province: "",
      city: "",
      area: "",
      address: "",
      areaList: areaList,
      common_used: false
    };
  },
  created() {},
  methods: {
    confirm(data) {
      //    console.log(data);
      this.province = data[0].name;
      this.city = data[1].name;
      this.area = data[2].name;
      this.pro_city_area = this.province + " " + this.city + " " + this.area;
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    addressAdd() {
      const addressInfo = {
        receiver_name: this.receiver_name,
        mobile: this.mobile,
        postcode: this.postcode,
        province: this.province,
        city: this.city,
        area: this.area,
        detailed_address: this.address,
        common_used: this.common_used ? 1 : 0
      };

      const addressStr = qs.stringify(addressInfo);
      this.$http.post("/v1/users/addReceiverAddress", addressStr).then(res => {
        if (res.data.status == 200) {
          this.$toast("新地址添加成功");
          setTimeout(() => {
            this.$router.push("/me/addressList");
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
button {
  margin-top: 50px;
  width: 80%;
}
.common-used {
  display: flex;
  padding: 20px;
}
</style>

