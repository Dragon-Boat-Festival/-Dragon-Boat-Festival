import Vue from 'vue'
import Vuex from 'vuex'
import {SETACTIVEINDEX, SETENDCENTER, CHANGESIZE} from '../store/mutations-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex: '/', // 菜单默认选项
    lat: 0,
    lng: 0,
    size: "90%",
  },
  mutations: {
    [SETACTIVEINDEX](state, {key}){
      state.activeIndex = key
    },
    [SETENDCENTER](state, endCenter) {
      // console.log(endCenter)
      state.lat = endCenter.lat
      state.lng = endCenter.lng
    },
    [CHANGESIZE](state, size) {
      state.size = size
    }
  },
  actions: {
    // 状态修改
    setActiveIndex({commit}, {key}) {
      // console.log(key)
      commit(SETACTIVEINDEX, {key})
    }
  },
  getters: { // 计算

  },
  modules: {
  }
})
