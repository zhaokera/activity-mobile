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
    <div class="swiper-content">
      <swiper ref="mySwiper" :options="swiperOption" class="show-swiper">
        <template v-for="(item, index) in list">
          <swiper-slide :key="index">
            <div class="swiper-item">
              <span>{{ item }}</span>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import LuckyWheel from "../../components/lucky-wheel";
import NoticeView from "./components/notice-view";
import { getWheelLoad } from "../../service/activity";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapState } from "vuex";
import store from "@/store";
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
        // 设置slider容器能够同时显示的slides数量，默认为1， 'auto'则自动根据slides的宽度来设定数量
        slidesPerView: "auto",
        /*
         * 开启这个参数来计算每个slide的progress(进度、进程)
         * 对于slide的progress属性，活动的那个为0，其他的依次减1
         */
        watchSlidesProgress: true,
        // 默认active slide居左，设置为true后居中
        centeredSlides: true,
        // 当你创建一个Swiper实例时是否立即初始化，这里我们手动初始化
        init: false,
        longSwipesRatio: 0.1,
        touchReleaseOnEdges: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        on: {
          progress: function () {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i); // 指定匹配元素集缩减值
              const slideProgress = this.slides[i].progress; // 当前元素集的progress值

              let modify = 0; // 偏移权重
              if (parseInt(Math.abs(slideProgress)) > 0) {
                modify = Math.abs(slideProgress) * 0.2; // 不一定要0.2，可自行调整
              }
              const translate = slideProgress * modify * 500 + "px"; // 500是swiper-slide的宽度
              const scale = 1 - Math.abs(slideProgress) / 5; // 缩放权重值，随着progress由中向两边依次递减，可自行调整
              const zIndex = 99 - Math.abs(Math.round(10 * slideProgress));
              slide.transform(`translateX(${translate}) scale(${scale})`);
              slide.css("zIndex", zIndex);
              slide.css("opacity", 1); // 是否可见
              if (parseInt(Math.abs(slideProgress)) > 1) {
                // 设置了只有选中的元素以及他两遍的显示，其他隐藏
                slide.css("opacity", 0);
              }
            }
          },
          slideChange: function () {
            store.commit("SET_ACTIVE_INDEX", this.activeIndex);
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapState({
      activeItemIndex: (state) => state.activeIndex,
    }),
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
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.$nextTick(async () => {
        await this.swiper.init(); // 现在才初始化
        await this.swiper.slideTo(this.activeItemIndex);
      });
    },
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

.swiper-content {
  width: 750px;
  height: 500px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding: 50px 0;

  .show-swiper {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .swiper-slide {
      width: 500px;
      // 表示所有属性都有动作效果，过度时间为0.4s，以慢速开始和结束的过渡效果
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      .swiper-item {
        width: 100%;
        height: 500px;
        background: rgb(140, 172, 134);
        border-radius: 6px;
        color: orangered;
        font-size: 24px;
        line-height: 1.5;
        border: 1px solid orangered;
      }
    }
  }
}
</style>