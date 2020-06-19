import {
  debounce
} from "common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    // 监听item中图片加载完成
    if (this.$refs.scroll) {
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.itemListener = () => {
        refresh();
      };
    }
    this.$bus.$on("itemImageLoad", this.itemListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenerBackTop(pos) {
      this.isShowBackTop = pos.y < -1000;
    }
  }
}
