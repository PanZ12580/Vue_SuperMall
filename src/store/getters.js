export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  isCheckAll(state) {
    // return state.cartList.length !== 0 && !state.cartList.find(item => !item.checked)
    return state.cartList.length !== 0 && !state.cartList.some(item => !item.checked)
    // return state.cartList.length !== 0 && state.cartList.every(item => item.checked)
  },
  isSelect(state) {
    return state.cartList.length !== 0 && state.cartList.some(item => item.checked)
  }
}
