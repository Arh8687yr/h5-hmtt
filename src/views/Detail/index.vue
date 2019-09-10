<template>
  <div class="article-container">
    <van-nav-bar fixed left-text="返回" @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <div class="detail" v-if="article">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | fmtDate}}</p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'detail',
  props: ['id'],
  data () {
    return {
      article: null
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 获取文章详情
    async getArticle () {
      try {
        const data = await getArticle(this.id)
        this.article = data
      } catch (err) {
        console.log('获取文章详情失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
