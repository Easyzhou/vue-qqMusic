/**
 * Created by Administrator on 2017/9/6 0006.
 */
import * as types from './mutation-types'

//多次改变mutations,需使用actions
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
}
