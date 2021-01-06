<template>
  <div class="container">
    <img
      class="notice-img"
      src="https://isv.alibabausercontent.com/010221699045/imgextra/i4/732742758/O1CN01RMcFBM1WFCxq4Rcbn_!!732742758-2-isvtu-010221699045.png"
      alt="notice"
    />
    <span class="notice-text">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "notice-view",
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  .notice-img {
    width: 22px;
    height: 21px;
  }
  .notice-text {
    margin-left: 17px;
    color: #ffd87a;
    font-size: 24px;
  }
}
</style>