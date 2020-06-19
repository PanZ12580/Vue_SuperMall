<template>
  <div id="home">
    <nav-bar class="home_navbar">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="contentPullingUp"
    >
      <template #default>
        <home-swiper :childBanners="banners" class="home-swiper" @imageLoad="imageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control ref="tabControl2" @tabClick="tabClick" :titles="['流行', '新款', '精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </template>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childrenComponents/HomeSwiper";
import RecommendView from "./childrenComponents/RecommendView";
import FeatureView from "./childrenComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins: [itemListenerMixin, backTopMixin],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 2);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局监听
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  methods: {
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
      this.$nextTick(() => {
        this.$refs.scroll.finishPullUp();
      });
    },
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(pos) {
      this.listenerBackTop(pos);
      this.isTabFixed = -pos.y > this.tabOffsetTop;
    },
    contentPullingUp() {
      this.getHomeGoods(this.currentType);
    },
    imageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
.home_navbar {
  background-color: var(--color-tint);
  color: white;
}
.tab-control {
  position: relative;
  z-index: 9;
}
#home {
  height: 100vh;
  position: relative;
}
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
</style>
