import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHECKED_CHANGE,
  CHECKED_ALL
} from './mutation_types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  [CHECKED_CHANGE](state, payload) {
    let product = state.cartList.find(item => {
      return item.iid === payload
    })
    product.checked = !product.checked
  },
  [CHECKED_ALL](state) {
    const isCheckAll = this.getters.isCheckAll
    state.cartList.map(item => item.checked = !isCheckAll)
  }
}
