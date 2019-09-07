import request from '@/utils/request'

/**
 * 获取频道推荐文章(分登录获取未登录两种情况)
 * @param {*} 参数 channel_id 频道id , timestamp 时间戳, with_top 是否包含置顶
 */

export const getArticles = ({
  channel_id,
  timestamp,
  with_top
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id,
      timestamp,
      with_top
    }
  })
}
