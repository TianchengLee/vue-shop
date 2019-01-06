<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  height: 100%;
}
.v-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.v-leave-to {
  transform: translateX(100%);
  opacity: 0;
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-move {
  transition: all 0.6s ease;
}
.v-leave-active {
  position: absolute;
}
.van-nav-bar {
  z-index: 999 !important;
}
</style>
