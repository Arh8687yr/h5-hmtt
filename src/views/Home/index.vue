<template>
  <div>
    <!-- 顶部标题区域 -->
    <van-nav-bar fixed="" title="黑马头条" />
    <!-- tab标签区域 -->
    <van-tabs v-model="activeIndex" animated>
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表区域 -->
        <van-list v-model="currentChannel.loading" :finished="currentChannel.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in currentChannel.articles" :key="item.art_id.toString()" :title="item.title" />

        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
import { getItem, setItem } from '@/utils/localStorage'
import { getArticles } from '@/api/article'
export default {
  name: 'home',
  data () {
    return {
      // 频道
      channels: [],
      // 展示当前频道索引
      activeIndex: 0
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
      channels.forEach((channel) => {
        channel.timestamp = null
        channel.articles = []
        channel.loading = false
        channel.finished = false
      })
      this.channels = channels
    },
    // list组件事件
    async onLoad () {
      // 获取当前频道
      // const currentChannel = this.channels[this.activeIndex]
      // 发送请求
      const data = await getArticles({
        // 当前频道id
        channel_id: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        with_top: 1
      })
      // 获取当前频道对象
      // 记录当前频道对象的时间戳和文章数组
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      this.currentChannel.loading = false
      // 如果某一频道文章加载完毕，将会共享finished 所以要将finished给每个频道
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    }
  },
  computed: {
    currentChannel () {
      console.log(this.channels[this.activeIndex])
      return this.channels[this.activeIndex]
    }
  },
  created () {
    // 获取频道列表
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 10px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
}
.close {
  float: right;
}
.nav-btn {
  position: fixed;
  right: 10px;
  line-height: 44px;
  background-color: #fff;
  opacity: 0.8;
  font-size: 22px;
}
</style>
