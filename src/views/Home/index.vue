<template>
  <div>
    <!-- 顶部标题区域 -->
    <van-nav-bar title="黑马头条" />
    <!-- tab标签区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="channelItem in channels" :title="channelItem.name" :key="channelItem.id">
        <!-- 文章列表区域 -->
        <!-- <van-list>
          <van-cell v-for="item in channels" :key="item" :title="item" />
        </van-list> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
export default {
  name: 'home',
  data () {
    return {
      channels: [],
      active: 0
    }
  },
  methods: {
    // 获取频道列表
    async getChannels () {
      const data = await getChannel()
      this.channels = data.channels
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
