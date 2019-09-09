<template>
  <div>
    <!-- 顶部标题区域 -->
    <van-nav-bar fixed title="黑马头条" />
    <!-- tab标签区域 -->
    <van-tabs v-model="activeIndex" animated>
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表区域 -->
        <!-- 下拉刷新文章列表 -->
        <van-pull-refresh
          v-model="currentChannel.isLoading"
          :success-text="successText"
          @refresh="onRefresh"
        >
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 点击按钮进入详情页 -->
            <van-cell
              @click="$router.push({ name: 'detail', params: { id: article.art_id.toString() } })"
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <div slot="label">
                <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="img + index">
                    <van-image lazy-load height="80" :src="img">
                      <!-- 图片的加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <span>{{ article.pubdate | fmtDate }}</span>&nbsp;
                  <van-icon name="cross" class="close" />
                  <!-- <van-icon name="cross" class="close" @click.stop="handleAction(article)" /> -->
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
import { getItem, setItem } from '@/utils/localStorage'
import { getArticles } from '@/api/article'

import Vue from 'vue'
import { Lazyload } from 'vant'

// options 为可选参数，无则不传
Vue.use(Lazyload)

export default {
  name: 'home',
  data () {
    return {
      // 频道
      channels: [],
      // 展示当前频道索引
      activeIndex: 0,
      // 下拉刷新完毕之后成功提示
      successText: ''
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
      channels.forEach(channel => {
        channel.timestamp = null
        channel.articles = []
        channel.loading = false
        channel.finished = false
        channel.isLoading = false
      })
      this.channels = channels
    },
    // list组件获取该频道文章
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
    },
    // 下拉刷新最新的新闻并显示在列表最前
    async onRefresh () {
      const data = await getArticles({
        channel_id: this.currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      this.currentChannel.articles.unshift(...data.results)
      this.currentChannel.isLoading = false
      this.successText = `此次加载共刷新${data.results.length}条数据`
    }
  },
  computed: {
    currentChannel () {
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
