<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab.vue'
  import player from 'components/player/player.vue'

  export default {
    components: {
      MHeader,
      Tab,
      player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable"

  #app
    color: $color-theme
</style>
