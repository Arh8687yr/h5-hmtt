<template>
  <div id="app">
    <!-- keep-alive 缓存动态组件 提高性能 -->
    <!-- exclude 匹配的组件不会被缓存 -->
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
</style>
