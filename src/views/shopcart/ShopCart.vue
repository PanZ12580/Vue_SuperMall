<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>购物车({{cartLength}})</template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <template #default>
        <!-- 商品列表 -->
        <cart-list></cart-list>
      </template>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComp/CartList";
import CartBottomBar from "./childComp/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "ShortCart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
    /*     ...mapGetters({
      length: 'cartLength'
    }) */
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
#cart {
  height: 100vh;
  /* position: relative; */
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}

</style>
