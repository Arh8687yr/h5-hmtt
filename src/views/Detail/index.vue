<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="文章详情" left-text="返回" fixed left-arrow @click-left="$router.back()" />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">
      </div>
      <!-- 点赞和取消 -->
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

<style lang="less" scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
