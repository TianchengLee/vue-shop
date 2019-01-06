<template>
  <div class="cmt-container">
    <!-- <h3>发表评论</h3>
    <textarea placeholder="请输入评论内容" maxlength="120" v-model="msg"></textarea>-->
    <van-cell-group>
      <van-field
        v-model="msg"
        label="请您评论: "
        type="textarea"
        placeholder="请输入评论"
        rows="3"
        autosize
      />
    </van-cell-group>

    <van-button type="primary" size="large" @click="addComment">发表评论</van-button>

    <van-list
      class="cmt-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getComments"
    >
      <transition-group appear>
        <div class="cmt-item" v-for="item in comments" :key="item.id">
          <div class="cmt-title">
            <span v-text="item.nickname"></span>
            <span v-text="item.ctime"></span>
          </div>
          <div class="cmt-body" v-text="item.comment"></div>
        </div>
      </transition-group>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: "", // 评论输入的内容
      loading: false,
      finished: false
    };
  },
  mounted() {
    // console.log(this.$refs.vlist.check());
  },
  methods: {
    getComments() {
      let pageInfo = {
        page: this.pageIndex,
        pageSize: 1
      };
      this.$http
        .get("/v1/news/getCommentList/" + this.id, { params: pageInfo })
        .then(res => {
          if (res.data.status == 200) {
            this.comments = this.comments.concat(res.data.data.comments);
            this.loading = false;
            if (this.comments.length >= res.data.data.totalCount) {
              this.finished = true;
            }
          }
        });
      this.pageIndex++;
    },
    addComment() {
      if (this.msg.trim().length === 0) {
        return this.$toast("评论内容不能为空！");
      }

      this.$http
        .post("/v1/news/postComment/" + this.id, { comment: this.msg.trim() })
        .then(res => {
          if (res.data.status == 200) {
            this.comments.unshift(res.data.data);
            this.msg = "";
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="less" scoped>
.cmt-container {
  padding: 5px;
  .cmt-list {
    margin: 10px 0;
    .cmt-item {
      font-size: 13px;
      box-shadow: 0 0 6px #ccc;
      border-radius: 5px;
      margin: 10px 0;
      padding: 6px;
      .cmt-title {
        line-height: 25px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        padding-right: 5px;
        font-size: 14px;
      }
      .cmt-body {
        line-height: 35px;
        text-align: left;
      }
    }
  }
}
</style>
