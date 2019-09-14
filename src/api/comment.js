import request from '@/utils/request'

// 获取文章评论列表
export const getComments = ({
  // 是否为文章的评论，若不是，为回复的评论
  isArticle,
  // 文章id或者评论id
  source,
  // 从此评论的id的数据向后取，不传表示从第一页开始读取数据
  offset,
  // 获取的评论数据个数
  limit
}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      // a 文章的评论   c 评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}

// 发布评论
export const sendComments = ({
  // 评论的目标id(评论文章即为当前浏览文章的id,对评论进行恢复则为评论id)
  target,
  // 评论的内容
  content,
  art_id
}) => {
  return request.poat('/app/v1_0/comments', {
    target,
    content,
    art_id
  })
}
