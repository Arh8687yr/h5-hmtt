import request from '@/utils/request'

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
  return request.getComments({
    params: {
      // a表示文章的评论，c表示回复的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
