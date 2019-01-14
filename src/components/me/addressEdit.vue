<template>
  <div class="register">
    <van-cell-group>
      <van-field v-model="receiver_name" required clearable label="用户名" placeholder="请输入用户名"/>
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
    <!-- 省市区三级联动弹出框 -->
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel"/>
    </van-popup>

    <van-button type="warning" size="large" @click="addressModify">修改收货地址</van-button>
  </div>
</template>

<script>
import qs from "qs";
import areaList from "../../assets/address.js";
export default {
  data() {
    return {
      id: "",
      receiver_name: "",
      mobile: "",
      postcode: "",
      pro_city_area: "",
      show: false, //省市区三级联动是否显示
      province: "",
      city: "",
      area: "",
      address: "",
      areaList: areaList
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.$http.get("v1/users/getReceiverAddress/" + this.id).then(res => {
      if (res.data.status == 200) {
        this.receiver_name = res.data.data.receiver_name;
        this.mobile = res.data.data.mobile;
        this.postcode = res.data.data.postcode;
        this.province = res.data.data.province;
        this.city = res.data.data.city;
        this.area = res.data.data.area;
        this.pro_city_area = this.province + " " + this.city + " " + this.area;
        this.address = res.data.data.detailed_address;
      }
    });
  },
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
    addressModify() {
      const addressInfo = {
        receiver_name: this.receiver_name,
        mobile: this.mobile,
        postcode: this.postcode,
        province: this.province,
        city: this.city,
        area: this.area,
        detailed_address: this.address
      };

      const addressStr = qs.stringify(addressInfo);
      this.$http
        .post("/v1/users/updateReceiverAddress/" + this.id, addressStr)
        .then(res => {
          if (res.data.status == 200) {
            this.$toast("地址修改成功");
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
</style>

