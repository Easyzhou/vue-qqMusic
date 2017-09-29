<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import musicList from 'components/music-list/music-list'
    import {getSingerDetailList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import {createSongs} from 'common/js/song'

    export default {
      data() {
        return {
          songs: []
        }
      },
      computed: {
        title() {
          return this.singer.name
        },
        bgImage() {
          return this.singer.avatar
        },
        ...mapGetters([
          'singer'
        ])
      },
      created() {
        this._getSingerDetailList(this.singer.id);
      },
      methods: {
        _getSingerDetailList(id) {
          if(!id){
            this.$router.push('/singer')
            return
          }
          getSingerDetailList(id).then((res) => {
            if(res.code === ERR_OK){
              //console.log(res.data.list)
              this.songs = this._normalizeSongs(res.data.list)
            }
          })
        },
        //格式化song数据
        _normalizeSongs(list) {
          let ret = []
          list.forEach((item) => {
            let {musicData} = item
            if(musicData.songid && musicData.albumid){
              ret.push(createSongs(musicData))
            }
          })
          return ret
        }
      },
      components: {
        musicList
      }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  /*.single-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background*/

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
