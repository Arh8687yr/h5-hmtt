<template>
  <div>
    <!-- 顶部标题区域 -->
    <van-nav-bar title="黑马头条" />
    <!-- tab标签区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
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
import { getItem, setItem } from '@/utils/localStorage'
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
      // 判断用户的登录状态
      let channels = []
      // 1. 用户登录，发送请求，获取数据
      if (this.$store.state.token) {
        const data = await getChannel()
        channels = data.channels
      } else {
        // 2. 用户没有登录，先去本地获取数据
        channels = getItem('channels')
        // 如果本地没有数据，再发送请求，并将数据保存到本地
        if (!channels) {
          const data = await getChannel()
          channels = data.channels
          setItem('channels', channels)
        }
      }
      this.channels = channels
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
