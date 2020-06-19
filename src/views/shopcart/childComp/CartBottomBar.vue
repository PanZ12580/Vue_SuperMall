<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isCheckAll" class="check-button" @click.native="checkAll"></check-button>
      <span @click="checkAll">全选</span>
    </div>
    <div class="price">合计: {{totalPrice}}</div>
    <div class="calculate" @click="toCalculate">去计算: {{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { CHECKED_ALL } from "store/mutation_types";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length;
    },
    isCheckAll() {
      return this.$store.getters.isCheckAll
    }
  },
  methods: {
    checkAll() {
      this.$store.commit(CHECKED_ALL);
    },
    toCalculate() {
      if(!this.$store.getters.isSelect){
        this.$toast.show('请选择要购买的商品')
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  z-index: 20;
  position: relative;
  display: flex;
  height: 40px;
  background-color: #e6e6e6;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 80px;
}
.check-button {
  height: 25px;
  width: 25px;
  margin-right: 10px;
  margin-left: 5px;
  line-height: 25px;
}
.price {
  margin-left: 15px;
  flex: 1;
  text-align: center;
}
.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: var(--color-tint);
}
</style>
