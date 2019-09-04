// 在本地存储 存或者改数据
export const setItem = (key, item) => {
  // 如果item是对象那就转为JSON字符串
  //   if (item instanceof Object) {
  //     item = JSON.stringify(item)
  //   }
  window.localStorage.setItem(key, JSON.stringify(item))
}

// 读取本地存储数据 因为是取出数据所以需要将数据返回
// 将数据取出并转为对象
export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除本地存储
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
