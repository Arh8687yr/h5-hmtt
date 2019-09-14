<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text">
    </div>
    <div class="more-wrap">
      <van-icon
        name="star-o"></van-icon>
      <van-button
        size="small">发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendComment'
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 60%;
    input {
      border: none;
      color: #999;
      font-size: 20px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
