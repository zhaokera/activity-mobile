<template>
  <div class="prize-view">
    <Swiper ref="mcSwiper" class="echw-fb-swiper" :options="swiperOption">
      <SwiperSlide
        class="echw-fb-swiper-slide"
        v-for="(item, idx) in userContentImg"
        :key="idx"
      >
        <img :src="item" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  name: "prize-swiper-view",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        centeredSlides: true, // 当前slide居中显示
        slidesPerView: "auto", // 1是显示1个banner, 'auto'自适应
        spaceBetween: 12, // slide间隔（px）
        loop: true,
        autoplay: true,
        delay: 5000, //自动轮播， 默认 3000 ms
        simulateTouch: true, // 鼠标拖拽
        allowTouchMove: true, // 触摸滑动
      },
      userContentImg: [
        require("../../../../assets/img/give_up.png"),
        require("../../../../assets/img/give_up.png"),
        require("../../../../assets/img/give_up.png"),
      ], // n个
    };
  },
};
</script>

<style lang="less" scoped>
.prize-view {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  box-sizing: border-box;
  width: 750px;
  height: 450px;
  background: url(https://cjwx.oss-cn-zhangjiakou.aliyuncs.com/wheel1212/showPrize_02.png)
    no-repeat;
  background-size: 100% 100%;
}

.echw-fb-swiper {
  width: 420px;
  height: 300px;
  .echw-fb-swiper-slide {
    display: flex;
    align-items: center;
    img {
      width: 130px;
      height: 80px;
    }
  }
  .swiper-slide-active {
    margin-right: 12px;
    transform: scale(3);
    transition: 300ms;
    opacity: 1 !important;
    z-index: 2;
  }
  .swiper-slide {
    width: 130px;
    opacity: 0.5;
    img {
      width: 130px;
    }
  }
}
</style>