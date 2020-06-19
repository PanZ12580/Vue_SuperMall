<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in childBanners" :key="index">
        <template #default>
          <a :href="item.link">
            <img :src="item.image" alt @load="imageLoad" />
          </a>
        </template>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    childBanners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("imageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>
