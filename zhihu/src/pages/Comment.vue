<template>
    <div class="comment">
        <header class="clearfix">
            <i class="icon iconfont icon-back fl"></i>
            <span class="title">{{this.$store.state.comments}}条点评</span>
            <!-- <i class="icon iconfont fr" :class="[isFocus ? 'icon-jian' : 'icon-xiao63']" @click="toggleThemeFocus"></i> -->
        </header>
        <div class="long-comments" ref="longCommentList">
            <span class="title">{{this.$store.state.long_comments}}条长评</span>
            <div class="inner" v-for="item in this.longcomments">
                <img v-lazy.longCommentList="attachImageUrl(item.avatar)" alt="" class="fl">
                <div class="fr innercontent">
                    <span class="fl">{{item.author}}</span>
                    <i class="icon iconfont icon-dianzan11 fr">{{item.likes}}</i>
                    <div>{{item.content}}</div>
                    <span>time</span>
                    <span>展开</span>
                </div>
            </div>
        </div>
        <div class="short-comments" ref="shortCommentList">
            <div class="title clearfix">
                <span class="fl">{{this.$store.state.short_comments}}条短评</span>
                <i class=" fr icon iconfont icon-xialajiantou"></i>
            </div>
            <div class="inner" v-for="item in this.shortcomments">
                <img v-lazy.shortCommentList="attachImageUrl(item.avatar)" alt="" class="fl">
                <div class="innercontent fl clearfix">
                    <span class="fl">{{item.author}}</span>
                    <i class="icon iconfont icon-dianzan11 fr">{{item.likes}}</i>
                    <div class="pinlun fl">{{item.content}}</div>
                    <span class="time fl">time</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from "../router";
import axios from "axios";
export default {
  data() {
    return {
      longcomments: [],
      shortcomments: []
    };
  },
  created() {
    this.fetchLongComment();
    this.fetchShortComment();
  },
  methods: {
    fetchLongComment: function() {
      axios
        .get("api/story/" + this.$route.params.id + "/long-comments")
        .then(response => {
          this.longcomments = response.data.comments;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchShortComment: function() {
      axios
        .get("api/story/" + this.$route.params.id + "/short-comments")
        .then(response => {
          this.shortcomments = response.data.comments;
        })
        .catch(error => {
          console.log(error);
        });
    },
    attachImageUrl: function(srcUrl) {
      if (srcUrl !== undefined) {
        return srcUrl.replace(
          /http\w{0,1}:\/\/p/g,
          "https://images.weserv.nl/?url=p"
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
header {
  height: 45px;
  position: relative;
  background: #26a2ff;
  color: #fff;
  line-height: 45px;
  text-align: center;
  font-size: 20px;

  .icon {
    font-size: 24px;
    margin: 0 10px;
  }
}
.long-comments {
  span.title {
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 5px 0 5px 5px;
    display: inline-block;
    box-sizing: border-box;
  }
  .inner {
    display: inline-block;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding: 10px 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .innercontent {
      width: 85%;
      span {
        width: 80%;
      }
      i {
        width: 20%;
        text-align: right;
        padding-right: 5px;
        box-sizing: border-box;
      }
    }
  }
}
.short-comments {
  .title {
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 5px 0 5px 5px;
    display: inline-block;
    box-sizing: border-box;
    i {
      display: inline-block;
      margin-right: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .clickcontent {
    display: inline-block;
    color: #333;
  }
  .inner {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-top: 10px;
    }
    .innercontent {
      width: 88%;
      padding-left: 10px;
      box-sizing: border-box;
      span {
        width: 80%;
        margin-bottom: 5px;
      }
      i {
        width: 20%;
        text-align: right;
        padding-right: 5px;
        box-sizing: border-box;
        text-align: right;
      }
      .pinlun {
        width: 100%;
      }
      .time {
        display: inline-block;
        margin-top: 5px;
      }
    }
  }
}
</style>
