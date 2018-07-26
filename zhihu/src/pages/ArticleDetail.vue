
<template>

  <div class="news-detail">
    <mt-header>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" class="header-right-icon">
        <i class="icon iconfont icon-cmstubiaozitihua06"></i>
        <i class="icon iconfont icon-shoucang"></i>
        <i class="icon iconfont icon-pinglun" @click="showComment">{{this.$store.state.comments}}</i>
        <i class="icon iconfont icon-dianzan11">{{this.$store.state.popularity}}</i>
      </mt-button>
    </mt-header>
    <div class="top-wrapper">
      <img v-lazy="attachImageUrl(this.data.image)" :alt="this.data.title">
      <span class="top-title">{{data.title}}{{this.$store.state.id}}</span>
      <span class="img-source">{{this.data.image_source}}</span>
    </div>
    <div class="body-wrap" v-html="this.data.body">

    </div>
  </div>
</template>
<script>
import router from '../router';
import axios from "axios";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    let id = this.$route.params.id;
    this.fetchData();
    this.fetchStoryExtra();
  },
  methods: {
      fetchStoryExtra: function() {
      axios.get('api/story-extra/' + this.$store.state.id)
      .then(response=>{
        this.$store.state.comments=response.data.comments;
        this.$store.state.long_comments=response.data.long_comments;
        this.$store.state.popularity=response.data.popularity;
        this.$store.state.short_comments=response.data.short_comments;
      }).catch(error=>{
      consolo.log(error);
    })
    },
    fetchData: function() {
      // 获得新闻id
      let id = this.$route.params.id;
      axios
        .get("api/news/" + id)
        .then(response => {
          response.data.body = this.attachBodyContent(response.data.body);
          this.data = response.data;
        })
        .catch(error => {
          console.log(error);
        });

      this.$store.dispatch("changeCurrentNewsId", id);
    },
    // 查看评论页面
    showComment: function() {
      router.push({ name: "comment", params: { id: this.$store.state.id,long_comments: this.$store.state.long_comments} });
    },
    // 修改图片链接
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        );
      }
    },
    // 修改返回数据中的body中的图片链接
    attachBodyContent: function(body) {
      return body.replace(
        /src="http\w{0,1}:\/\//g,
        'src="https://images.weserv.nl/?url='
      );
    }
  }
};
</script>
<style lang="less">
@import "../assets/css/articles_zhihu.css";
.header-right-icon {
  i {
    font-size: 22px;
    margin-right: 10px;
  }
  i:last-child {
    margin: 0;
  }
}
.top-wrapper img {
  width: 100%;
  height: 100%;
}
.top-wrapper .top-title {
  position: absolute;
  bottom: 45px;
  color: #fff;
  left: 10px;
  font-size: 16px;
}
.top-wrapper .img-source {
  position: absolute;
  color: gray;
  right: 3px;
  bottom: 2px;
  font-size: 12px;
}
.top-wrapper {
  width: 100%;
  height: 220px;
  position: relative;
}
.body-wrap {
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;
}
</style>

