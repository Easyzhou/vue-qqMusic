/**
 * Created by Administrator on 2017/9/6 0006.
 */
//按 es6 的规范 import * as obj from "xxx" 会将 "xxx" 中所有 export 导出的内容组合成一个对象返回。如果都使用 es6 的规范，这个是很明确的

import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations
