<style lang="less" scoped>
.wrap,.mask {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed;
  z-index: 998;
  top:0;
  left: 0;
  overflow:auto;
}
.sidebar {
  width: 60%;
  background: #fff;
   position: absolute;
   z-index: 999;
  overflow:auto;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .top{
    padding:10px 0 25px 0px;
  }
    .menubar{
      padding: 0px 20px 15px 0;
      i{
        margin-right: 5px;
        font-size: 20px;
      }
    }
  .top,
  .menubar {
    background: #26a2ff;
    color: #fff;
    padding-left: 15px;
  }
  .menu-wrapper {
    ul {
      li{
        box-sizing: border-box;}
      .menu-index{
        height: 30px;
        background: #e8e8e8;
        color: #26a2ff;
        line-height: 30px;
        padding-left:20px;
        font-size: 16px;
        i{
          margin-right:15px;
        }
      }
      li.menu-item{
        position: relative;
        padding-left: 15px;
        height:60px;
        line-height:60px;
        font-size: 14px;
         i {
          float: right;
          margin-right:20px;
        }
      }
      li {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <transition name="move">
    <div class="wrap">
      <div class="sidebar">
        <div class="top">
          <img src="../assets/images/avatar.jpg" alt="" class="avatar">
          <span class="name">请登陆</span>
        </div>
        <div class="menubar clearfix">
          <div class="clearfix fl">
            <i class="icon iconfont icon-shoucang fl"></i>
            <span class="fl">我的收藏</span>
          </div>
          <div class="clearfix fr">
            <i class="icon iconfont icon-xiazai fl"></i>
            <span class="fl">离线下载</span>
          </div>
        </div>
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li class="menu-index">
              <i class="icon iconfont icon-index"></i>
              <span>首页</span>
            </li>
            <li class="menu-item" v-for="item in data" :key="item.id"  @click="themeDetail(item.id)">
              <span>{{item.name}}</span>
              <i class="icon iconfont icon-arrow-right"></i>
            </li>
           
          </ul>
        </div>
      </div>
          <div class="mask" @click="hideSideBar()"></div>
    </div>

  </transition>
</template>
<script>
import axios from "axios";
import router from '../router';
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    hideSideBar(){
       this.$emit('hideSidebar');
    },
    fetchData: function() {
      axios.get("api/themes").then(response => {
        this.data = response.data.others;
        console.log(response);
      });
    },
    themeDetail(id){
      // this.$store.dispatch('changeCurrentThemeId', id);
      router.push({ name: 'themeDetail', params: { id: id } });
      console.log(id);
    }
  }
};
</script>
