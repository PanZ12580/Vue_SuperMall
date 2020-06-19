<template>
  <div id="detail">
    <detail-nav-bar id="navbar" ref="navbar" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <template #default>
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo" @imageLoad="imageLoad"></detail-param-info>
        <detail-comment-info ref="comments" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommands" :goods="recommands" @itemImageLoad="imageLoad"></goods-list>
      </template>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComp/DetailNavBar";
import DetailSwiper from "./childComp/DetailSwiper";
import DetailBaseInfo from "./childComp/DetailBaseInfo";
import DetailShopInfo from "./childComp/DetailShopInfo";
import DetailBottomBar from "./childComp/DetailBottomBar";
import DetailGoodsInfo from "./childComp/DetailGoodsInfo";
import DetailParamInfo from "./childComp/DetailParamInfo";
import DetailCommentInfo from "./childComp/DetailCommentInfo";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { backTopMixin } from "common/mixin";

import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommands: [],
      themeTopYs: [],
      getThemeTopYs: null
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetails(this.iid).then(res => {
      const data = res.result;
      // 1.获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 防抖
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44);
        this.themeTopYs.push(-this.$refs.comments.$el.offsetTop + 44);
        this.themeTopYs.push(-this.$refs.recommands.$el.offsetTop + 44);
      }, 200);
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommands = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      if (this.$refs.scroll) {
        const refresh = debounce(this.$refs.scroll.refresh, 300);
        refresh();
        this.getThemeTopYs();
      }
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
    },
    contentScroll(pos) {
      // 导航栏与内容联动
      for (let i in this.themeTopYs) {
        i = parseInt(i);
        let length = this.themeTopYs.length;
        if (this.$refs.navbar.currentIndex != i) {
          if (
            i < length - 1 &&
            pos.y <= this.themeTopYs[i] &&
            pos.y > this.themeTopYs[i + 1]
          ) {
            this.$refs.navbar.currentIndex = i;
          } else if (i === length - 1 && pos.y <= this.themeTopYs[i]) {
            this.$refs.navbar.currentIndex = i;
          }
        }
      }
      // 监听滚动，显示与隐藏backTop
      this.listenerBackTop(pos);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res)
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
}
#navbar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
