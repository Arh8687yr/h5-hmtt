<template>
  <div>
    <van-list :finished="finished" v-model="loading" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | fmtDate}}</span>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <span>回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: ['isArticle', 'source'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    // 组件第一次加载时 和 下拉获取新数据时执行
    async onLoad () {
      try {
        const data = await getComments({
          isArticle: this.isArticle,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // 将当前获取的最后一条数据的id存储
        this.offset = data.last_id
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取评论列表失败')
        console.dir(err)
      }
    }
  },
  created () {
    this.onLoad()
  }
}
</script>
<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
