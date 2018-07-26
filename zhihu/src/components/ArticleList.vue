<template>
  <ul ref="newsList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check=true infinite-scroll-distance="40">
    <li class="clearfix" v-for="story in this.$store.state.stories" :key="story.id" @click="viewDetail(story.id)">
      <div class="list-title fl">{{story.title}}</div>
      <div class="list-img fr"> <img :src="attachImageUrl(story.images[0])" :alt="story.title"></div>
    </li>

  </ul>
</template>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";
import router from "../router";
export default {
  name: "ArticleList",
  data() {
    return {
      stories: {}
    };
  },
  created() {
    this.fetchData();
    this.initDate();
    this.$on("refresh", () => {
      this.refreshData();
    });
  },
  methods: {
    // 今日新闻
    fetchData: function() {
      axios
        .get("api/news/latest")
        .then(response => {
          let stories = response.data.stories;
          let ids = stories.map(story => story.id);
          this.$store.dispatch("addNews", {
            stories: stories,
            ids: ids
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    	// 刷新数据
			refreshData() {
				// 刷新数据
				this.$store.dispatch('refreshNews');

				this.$nextTick(() => {
					this.fetchData();
				});
			},
    fetchMoreData: function() {
      axios
        .get("api/news/before/" + this.dateStr)
        .then(response => {
          // 合并数据
          let stories = response.data.stories;
          console.log(response.data.date);
          let ids = stories.map(story => story.id);
          this.$store.dispatch("addNews", {
            stories: stories,
            ids: ids
          });
          // 合并完数据关闭加载提示框
          Indicator.close();
        })
        .catch(error => {
          console.log(error);
        });
      // 将日期前推一天
      this.date.setDate(this.date.getDate() - 1);
      this.changeDate2String();
    },
    initDate: function() {
      this.date = new Date();
      this.changeDate2String();
    },
    // 将Date类型的日期转换成String类型
    changeDate2String: function() {
      let year = this.date.getFullYear();
      console.log(year);
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      this.dateStr = year + month + day;
    },
  
    loadMore: function() {
      this.loading = true;
      Indicator.open({
        spinnerType: "fading-circle"
      });
      // 加载更多数据并更新DOM
       this.$nextTick(function() {
        this.fetchMoreData();
       });
      this.loading = false;
    },
    viewDetail: function(id) {
      router.push({ name: "articleDetail", params: { id: id } });
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

<style scoped lang="less">
.article-list {
  background: rgb(238, 235, 235);
  padding: 15px 15px;
  h4 {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  ul {
    width: 100%;
    li {
      width: 100%;
      box-shadow: 0px 0px 3px rgb(247, 220, 220);
      height: 80px;
      margin-bottom: 15px;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      .list-title {
        width: 70%;
      }
      .list-img {
        width: 20%;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
