<template>
  <div class="check-button">
    <img
      class="checkImg"
      src="~assets/images/cart/check.svg"
      alt
      v-if="!isChecked"
    />
    <img
      class="checkImg"
      src="~assets/images/cart/checked.svg"
      alt
      v-else
    />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.checkImg {
  height: 25px;
  width: 25px;
}
</style>
