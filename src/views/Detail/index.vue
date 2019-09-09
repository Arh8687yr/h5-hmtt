<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article">
      <!-- 文章标题 -->
      <h2 class="article-title">这是文章的标题</h2>
      <!-- 作者信息 -->
      <!-- 文章内容 -->
      <div class="article-content">
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
      </div>
      <!-- 点赞和取消 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail'
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
