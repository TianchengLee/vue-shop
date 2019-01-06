<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <textarea placeholder="请输入评论内容" maxlength="120" v-model="msg"></textarea>

    <van-button type="primary" size="large" @click="addComment">发表评论</van-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}楼
        </div>
        <div class="cmt-body">
          {{ item.comment === 'undefined' ? '此用户很懒，嘛都没说': item.comment }}
        </div>
      </div>

    </div>

    <van-button type="danger" size="large" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: "" // 评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      let pageInfo = {
          page:this.pageIndex,
          pageSize:10
      }
      this.$http.get("/v1/news/getCommentList/"+this.id,{params:pageInfo}).then(res => {
          if (res.data.status == 200) {
            this.comments = this.comments.concat(res.data.data.comments);
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

      this.$http.post("/v1/news/postComment/"+this.id, {comment: this.msg.trim()})
      .then(res=>{
          if (res.data.status == 200) {
            var cmt = {
              comment: this.msg.trim(),
              news_id:this.id
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
  padding:5px;
  h3 {
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    text-align: left;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    width:98%;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
        text-align:left;
      }
      .cmt-body {
        line-height: 35px;
        text-align:left;
      }
    }
  }
}
</style>
