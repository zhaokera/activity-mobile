<template>
  <div class="page">
    <div class="title-view">
      <div class="logo"></div>
      <div class="title">欢客互动的欢小铺</div>
    </div>
    <div class="notice-view">
      <van-swipe
        class="swipe-view"
        :autoplay="3000"
        vertical
        :show-indicators="false"
      >
        <van-swipe-item
          class="swipe-item-view"
          v-for="item of loadData.logs"
          :key="item.id"
          height="60px"
        >
          <NoticeView
            :title="
              item.userId
                ? `恭喜${item.buyerNick.substring(0, 1)}***网友中了${
                    item.fansRemark
                  }`
                : item.noticeString
            "
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <lucky-wheel class="wheel"></lucky-wheel>
    <div class="fun-btn-view">
      <div class="fun-btn"></div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import LuckyWheel from "../../components/lucky-wheel";
import NoticeView from "./components/notice-view";
import { getWheelLoad } from "../../service/activity";

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
      loadData: { logs: [] },
    };
  },
  mounted() {
    const that = this;
    getWheelLoad().then((res) => {
      that.loadData = res.result;
      console.log(JSON.stringify(that.loadData.logs)); // 打印一下响应数据
      if (!that.loadData.logs.length) {
        that.loadData.logs = [
          {
            noticeString: "期待您的大名出现在这里!",
          },
        ];
      }
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
    .swipe-view {
      height: 60px;
      width: 100%;
      .swipe-item-view {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }
  }
}

.wheel {
  margin-top: 29px;
}
.fun-btn {
  width: 190px;
  height: 71px;
  background: url("https://isv.alibabausercontent.com/010221699045/imgextra/i2/732742758/O1CN01Js2p8u1WFCxqA08ec_!!732742758-2-isvtu-010221699045.png")
    no-repeat;
  background-size: 100% 100%;
}
</style>