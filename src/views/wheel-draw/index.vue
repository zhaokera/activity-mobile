<template>
  <div class="page">
    <div class="title-view">
      <div class="logo"></div>
      <div class="title">欢客互动的欢小铺</div>
    </div>

    <div class="notice-view" v-if="loadData.count">
      <van-swipe
        class="swipe-view"
        :autoplay="3000"
        vertical
        :show-indicators="false"
      >
        <van-swipe-item
          class="swipe-item-view"
          v-for="item of noticeList"
          :key="item.id"
          height="60px"
        >
          <NoticeView :title="item.title" />
          <!-- <img
            class="notice-img"
            src="https://isv.alibabausercontent.com/010221699045/imgextra/i4/732742758/O1CN01RMcFBM1WFCxq4Rcbn_!!732742758-2-isvtu-010221699045.png"
            alt="notice"
          />
          <span class="notice-text">{{ item.title }}</span> -->
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="notice-view" v-else>
      <NoticeView title="期待您的大名出现在这里!" />
    </div>
    <lucky-wheel class="wheel"></lucky-wheel>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import LuckyWheel from "../../components/lucky-wheel";
import NoticeView from "./components/notice-view";
import axios from "axios";
require("../../mock/mock");

export default {
  name: "WheelDraw",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    LuckyWheel,
    NoticeView,
  },
  data() {
    return {
      loadData: {},
      noticeList: [
        { id: "xx1", title: "zhaokkkk001" },
        { id: "xx2", title: "zhaokkkk002" },
        { id: "xx3", title: "zhaokkkk003" },
        { id: "xx4", title: "zhaokkkk004" },
      ],
    };
  },
  mounted() {
    axios.post("/mock/wheel/load").then((res) => {
      this.loadData = res.data.data;
      // url即在mock.js中定义的
      console.log(JSON.stringify(this.loadData)); // 打印一下响应数据
    });
  },
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  height: 2656px;
  background-size: 100%;
  overflow: scroll;
  background-image: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/12bg_01.png);
  .title-view {
    display: flex;
    height: 80px;
    width: 100vw;
    margin-top: 128px;
    align-items: center;
    .logo {
      margin-left: 25px;
      width: 80px;
      height: 80px;
      background-size: 100%;
      background-image: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/UR/avatar.png);
    }
    .title {
      margin-left: 17px;
      height: 34px;
      font-size: 36px;
      font-weight: 800;
      color: #ffffff;
    }
  }
}
.notice-view {
  display: flex;
  width: 480px;
  height: 60px;
  margin-top: 253px;
  background: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/banner12_03.png)
    no-repeat;
  border-radius: 20px 20px 10px 10px;
  background-size: 100% 100%;
  overflow: hidden;
}

.swipe-view {
  height: 60px;
  width: 100%;
  .swipe-item-view {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    // .notice-img {
    //   width: 22px;
    //   height: 21px;
    // }
    // .notice-text {
    //   margin-left: 17px;
    //   color: #ffd87a;
    // }
  }
}
.wheel {
  margin-top: 29px;
}
</style>