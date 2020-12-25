<template>
  <router-view />
</template>

<style lang="stylus">
@import '~@/assets/style/index.styl'
@import '~@/assets/style/vars.styl'

#app {
  display flex
  align-items stretch
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color $primary
  background-color $back
  font-size 0.7rem
}
</style>
