
<template>
  <div class="hello">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <SideBar v-if="isShowSidebar" v-on:hideSidebar="toggleSideBar"></SideBar>
      <mt-header class="header">
        <div slot="left" class="clearfix">
          <i class="icon iconfont icon-menu fl" @click="toggleSideBar()"></i>
          <h2 class="fl title">首页</h2>
        </div>
        <div slot="right">
          <i class="icon iconfont icon-bell"></i>
          <i class="icon iconfont icon-more"></i>
        </div>
      </mt-header>
        <mt-swipe :auto="1000" class="home-swipe">
          <mt-swipe-item class="swipe-item" v-for="topStory in topStories" :key="topStory.id" @click.native="viewDetail(topStory.id)">
            <img :src="attachImageUrl(topStory.image)" :alt="topStory.title">
            <span class="swipe-item-word">{{topStory.title}}</span>
          </mt-swipe-item>
        </mt-swipe>

      <div class="article-list" ref="articlelist">
        <h4>今日新闻</h4>
        <ArticleList> </ArticleList>
      </div>
    </mt-loadmore>

  </div>
</template>

<script>
import axios from "axios";
import ArticleList from "../components/ArticleList";
import SideBar from '../components/SideBar';
import router from "../router";
export default {
  name: "Home",
  data() {
    return {
       topStories: {},
      isShowSidebar:false
    };
  },
  components: {
    ArticleList: ArticleList,
    SideBar:SideBar
  },
  created() {
    // 首页banner数据请求
    axios.get("api/news/latest")
      .then(response => {
        this.topStories = response.data.top_stories;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    loadTop() {
       this.$refs.articlelist.$emit("refresh");
      this.$refs.loadmore.onTopLoaded();
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
    viewDetail: function(id) {
      router.push({ name: "articleDetail", params: { id: id } });
    },
    toggleSideBar(){
        let scrollTop;
      if (!this.isShowSidebar) { // 禁止滑动
        scrollTop = document.scrollingElement.scrollTop;
        document.body.style.position = 'fixed';
      } else { // 取消滑动限制
        document.body.style.position = '';
        document.scrollingElement.scrollTop = scrollTop;
      }
       this.isShowSidebar = !this.isShowSidebar;
    }
  }
};
</script>
<style scoped lang="less">
.header {
  h2 {
    font-size: 16px;
  }
  i {
    display: inline-block;
    font-size: 20px;
  }
  .title {
    margin-left: 10px;
  }
}
.home-swipe {
  width: 100%;
  height: 220px;
  .swipe-item {
   //position: relative;
    height: 100%;
    img {
      width: 100%;
      height: 230px;
    }

    .swipe-item-word {
      position: absolute;
      width: 100%;
      max-height: 80px;
      bottom: 20px;
      color: #fff;
    }
  }
}
.article-list {
  background: rgb(238, 235, 235);
  padding: 15px 15px;
  h4 {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
</style>
