<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace to="/ask" icon="search">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
