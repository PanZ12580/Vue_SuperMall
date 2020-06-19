<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="back">
          <img src="~assets/images/common/back.svg" />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            class="title-item"
            v-for="(item, index) in titles"
            :key="index"
            @click="itemClick(index)"
          >
            <span :class="{active: index === currentIndex}">{{item}}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index)
    },
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.title-item .active {
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
  padding: 7px;
}
.back {
  margin-top: 7px;
}
</style>
