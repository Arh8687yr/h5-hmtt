<template>
  <div>
    <!-- 顶部标题区域 -->
    <van-nav-bar title="黑马头条" />
    <!-- tab标签区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="index in lists" :title="'标签 ' + index" :key="index">
        <!-- 文章列表区域 -->
        <van-list>
          <van-cell v-for="item in lists" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      lists: [1, 2, 3, 4, 5, 6, 7, 8],
      active: 0
    }
  }
}
</script>

<style>
</style>
