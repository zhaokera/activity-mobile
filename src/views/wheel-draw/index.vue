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
      <div v-for="name of funBtnNames" :key="name" class="fun-btn">
        {{ name }}
      </div>
    </div>
    <!-- <div class="price-view"> -->
    <!-- </div> -->

    <swiper ref="mcSwiper" class="echw-fb-swiper" :options="swiperOption">
      <swiper-slide
        class="echw-fb-swiper-slide"
        v-for="(item, idx) in userContentImg"
        :key="idx"
      >
        <img :style="`backgroundColor: white`" :src="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import LuckyWheel from "../../components/lucky-wheel";
import NoticeView from "./components/notice-view";
import { getWheelLoad } from "../../service/activity";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// import "swiper/css/swiper.css";

export default {
  name: "WheelDraw",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    LuckyWheel,
    NoticeView,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      loadData: { logs: [] },
      funBtnNames: [
        "每日赠送",
        "关注店铺",
        "进店逛逛",
        "进店消费",
        "浏览宝贝",
        "分享活动",
      ],
      list: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        centeredSlides: true, // 当前slide居中显示
        slidesPerView: "auto", // 1是显示1个banner, 'auto'自适应
        spaceBetween: 12, // slide间隔（px）
        loop: false,
        autoplay: true,
        delay: 5000, //自动轮播， 默认 3000 ms
        simulateTouch: true, // 鼠标拖拽
        allowTouchMove: true, // 触摸滑动
      },
      userContentImg: [
        "https://isv.alibabausercontent.com/010221699045/imgextra/i2/732742758/O1CN01Js2p8u1WFCxqA08ec_!!732742758-2-isvtu-010221699045.png",
        "https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/showPrize_02.png",
        "https://isv.alibabausercontent.com/010221699045/imgextra/i2/732742758/O1CN01Js2p8u1WFCxqA08ec_!!732742758-2-isvtu-010221699045.png",
      ], // n个
    };
  },
  computed: {},
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
  methods: {},
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
.fun-btn-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  width: 750px;
  height: 238px;
  margin-top: 80px;
  // padding-top: 42px;
  // padding-left: 34px;
  padding: 42px 34px 20px 34px;
  background: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/task_02.png)
    no-repeat;
  background-size: 100% 100%;
}
.fun-btn {
  display: flex;
  box-sizing: border-box;
  width: 190px;
  height: 71px;
  padding-top: 15px;
  justify-content: center;
  font-size: 26px;
  color: #c60600;
  background: url("https://isv.alibabausercontent.com/010221699045/imgextra/i2/732742758/O1CN01Js2p8u1WFCxqA08ec_!!732742758-2-isvtu-010221699045.png")
    no-repeat;
  background-size: 100% 100%;
}
.price-view {
  // display: flex;
  margin-top: 35px;
  box-sizing: border-box;
  width: 750px;
  height: 450px;
  background: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/showPrize_02.png)
    no-repeat;
  background-size: 100% 100%;
}

.echw-fb-swiper {
  width: 750px;
  height: 300px;
  // padding-left: 300px;
  // swiper-slide -- 无论是不是当前slide，宽高保持不变
  .echw-fb-swiper-slide {
    width: 750px;
    height: 300px;
    
    // 图片居左
    img {
      display: block;
      width: 400px;
      height: 260px;
      // margin: 20px 0;
      border-radius: 12px;
      
    }
  }
  // 当前slide -- 图片放大
  .swiper-slide-active {
    img {
      width: 500px;
      height: 300px;
      // margin: 0;
    }
  }
  // 前slide -- 图片居右
  .swiper-slide-prev {
    img {
      // margin-left: 50px;
    }
  }
}
</style>