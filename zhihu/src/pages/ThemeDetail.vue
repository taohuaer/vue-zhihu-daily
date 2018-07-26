<template>
    <div class="theme-detail">
        <header class="clearfix">
            <i class="icon iconfont icon-back fl" @click="backIndex"></i>
            <span class="title">{{data.name}}</span>
            <i class="icon iconfont fr" :class="[isFocus ? 'icon-jian' : 'icon-xiao63']" @click="toggleThemeFocus"></i>
        </header>
        <div class="topimages">
            <img v-lazy="attachImageUrl(data.image)" alt="">
            <span>{{data.description}}</span>
        </div>
        <div class="editors">
            <span class="text">主编</span>
            <img v-lazy="attachImageUrl(data.editors[0].avatar)" alt="">
        </div>
        <ul class="list" ref="list">
            <li class="list-item" v-for="item in data.stories" key="" @click="viewDetail(item.id)">
                <span class="item-title fl">{{item.title}}</span>
                <div class="image-wrapper fr" v-if="item.images !== undefined">
                    <img class="item-image" v-lazy.list="attachImageUrl(item.images[0])" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Lazyload } from "mint-ui";
import router from "../router";
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      data: {},
      editorIds: [],
      isFocus: true,
      isShowSidebar:false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchData();
  },
  methods: {
       toggleThemeFocus() {
      this.isFocus = !this.isFocus;
    },
    // 获取指定id主题下的数据
    fetchData() {
      axios.get("api/theme/" + this.id).then(response => {
        this.data = response.data;
          this.data.editors.map((item) => {
            this.editorIds.push(item.id);
          });
      });
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
     backIndex() {
      router.push({ name: 'Home' });
    },
      viewDetail: function(id) {
      router.push({ name: "articleDetail", params: { id: id } });
    },
  }
};
</script>

<style lang="less">
header {
  height: 45px;
  position: relative;
  background: #26a2ff;
  color:#fff;
  line-height: 45px;
  text-align: center;
  font-size: 20px;

  .icon {
    font-size: 24px;
    margin: 0 10px;
  }
}

.topimages {
    background: #eee;
  width: 100%;
  height: 220px;
  position: relative;
  img{
    width:100%;
    height:100%;
  }
  span{
      position: absolute;
      bottom: 15px;
      color:#fff;
      padding:0 10px;
  }
}
.editors{
    background: #eee;
    padding-top: 10px;
    span.text{
        margin-right: 15px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
    }
    img{
        width:30px;
        height:30px;
        border-radius: 50%;
        vertical-align: middle;
    }
}
.list {
  padding: 0px 10px;
  background: #eee;
  .list-item {
    width: 100%;
    box-shadow: 0px 0px 3px rgb(247, 220, 220);
    box-sizing: border-box;
    margin: 10px 0;
    background: #fff;
    min-height: 66px;
    span {
      width: 70%;
      padding: 5px 0 0 5px;
      display: inline-block;
    }
    .image-wrapper {
      img {
        width: 80px;
        height: 66px;
      }
    }
  }
}
</style>