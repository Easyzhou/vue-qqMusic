/**
 * Created by Administrator on 2017/9/6 0006.
 */
import {playMode} from 'common/js/config'

const state = {
  singer: {},
  //播放器状态
  playing: false,
  fullScreen: false,
  //顺序播放模式
  playlist: [],
  //随机播放模式
  sequenceList: [],
  //当前播放模式
  mode: playMode.sequence,
  //当前播放歌曲的索引
  currentIndex: -1
}

export default state
