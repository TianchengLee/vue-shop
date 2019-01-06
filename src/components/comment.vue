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

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getMore">
      <van-cell v-for="item in comments" :key="item.id" :title="item.comment"/>
    </van-list>
    <!-- 
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div class="cmt-title">
          <span v-text="item.nickname"></span>
          <span v-text="item.ctime"></span>
        </div>
        <div class="cmt-body" v-text="item.comment"></div>
      </div>
    </div>

    <van-button type="danger" size="large" @click="getMore">加载更多</van-button>-->
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
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      let pageInfo = {
        page: this.pageIndex,
        pageSize: 10
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
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    addComment() {
      if (this.msg.trim().length === 0) {
        return this.$toast("评论内容不能为空！");
      }

      this.$http
        .post("/v1/news/postComment/" + this.id, { comment: this.msg.trim() })
        .then(res => {
          if (res.data.status == 200) {
            var cmt = {
              comment: this.msg.trim(),
              news_id: this.id
            };
            this.comments.unshift(cmt);
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
  // h3 {
  //   height: 16px;
  //   line-height: 16px;
  //   font-size: 16px;
  //   text-align: left;
  //   margin: 10px 0;
  // }
  // textarea {
  //   font-size: 14px;
  //   height: 85px;
  //   width:98%;
  //   margin: 0;
  // }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        padding-right: 5px;
      }
      .cmt-body {
        line-height: 35px;
        text-align: left;
        text-indent: 2em;
      }
    }
  }
}
</style>
