<template>
  <Scroll
    @scroll="scroll"
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType = "probeType"
    >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,index) in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="touchShort" @touchmove.stop.prvent="touchmoveShort">
      <ul>
        <li
          v-for="(item,index) in shortcutList"
          class="item"
          :class="{current:currentIndex === index}"
          :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">

    import Scroll from 'base/scroll/scroll'
    import {getData} from 'common/js/dom'
    const ANCHOR_NUM = 18
    const TITLE_HEIGHT = 30
    export default {
      created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        //scroll组件默认probeType默认是1，这里改为3，滚动的时候监听滚动高度更加准确
        this.probeType = 3
      },
      data() {
        return {
          scrollY: -1,
          currentIndex: 0,
        }
      },
      props: {
        data: {
          type: Array,
          default: []
        },
      },
      computed: {
        shortcutList() {
           return this.data.map((group) => {
             return group.title.substring(0, 1)
          })
        },
        fixedTitle() {
          if(this.scrollY > 0){
            return ""
          }
          return this.data[this.currentIndex]?this.data[this.currentIndex].title : ""
        }
      },
      methods:{
        selectItem(item) {
          this.$emit('select', item)
        },
        //实现点击右侧浮动字母页面滑动到对应位置
        touchShort(e) {
          let findIndex = getData(e.target, 'index')
          let firstTocuh = e.touches[0]
          //获取到手指触摸到屏幕时的位置
          this.touch.Y1 = firstTocuh.pageY
          //获取手指触摸到屏幕位置时的index下标
          this.touch.findIndex = findIndex
          this._scrollTo(findIndex)
        },
        //手指滑动右侧的字母条滚动到对应的位置
        touchmoveShort(e) {
          let firstTouch = e.touches[0]
          //获取开始滑动时屏幕的位置
          this.touch.Y2 = firstTouch.pageY
          //取开始滑动屏幕时语手指触摸到屏幕时的距离的差值，并计算出对应下标的差值
          let delta = (this.touch.Y2 - this.touch.Y1) / ANCHOR_NUM | 0 //向下取整
          let findIndex = parseInt(this.touch.findIndex) + delta
          this._scrollTo(findIndex)
        },
        _scrollTo(index) {
          if(!index && index !==0){
            return
          }
          //为了解决touchmove事件滚动到顶部和底部，导致的高亮bug,边界处理
          if(index<0){
            index = 0
          } else if(index > this.listHeight.length-2){
            index = this.listHeight.length-2
          }
          //console.log(index)
          //手动派发一个y轴滚动的位置
          this.scrollY = -this.listHeight[index]
          //页面滚动到对应位置的方法
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        //接收从子组件scroll派发的scroll事件
        scroll(pos) {
          //console.log('000')
          this.scrollY = pos.y
        },
        //滚动歌手列表时计算滚动高度
        _canculaterHeight() {
          this.listHeight = []
          const list = this.$refs.listGroup
          let height = 0
          this.listHeight.push(height)
          for(let i=0;i<list.length;i++) {
            let item = list[i]
            //计算每个区间在视口的高度
            height += list[i].clientHeight
            //将这些高度全部push进listHeight数组
            this.listHeight.push(height)
          }
        }
      },
      components:{
        Scroll
      },
      watch: {
        data() {
          //延迟调用计算滚动高度，(dom更新需要时间)
          setTimeout(() => {
            this._canculaterHeight()
          },20)
        },
        //观测滚动的高度变化
        scrollY(newY) {
          //console.log(1)
          //当滚动到顶部 newY > 0
          if(newY > 0){
            this.currentIndex = 0
            return
          }
          //当滚动在中部
          const listHeight = this.listHeight
          for(let i=0;i<listHeight.length;i++){
            let height1 = listHeight[i]
            let height2 = listHeight[i+1]
            if((-newY)>=height1 && (-newY)<height2){
              this.currentIndex = i
              //console.log(this.currentIndex)
              return
            }
          }
          //当滚动到底部，且-newY大于最后一个元素的上限
          this.currentIndex = listHeight.length - 2
        }
      }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
