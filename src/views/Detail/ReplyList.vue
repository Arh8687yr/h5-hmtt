<template>
  <div>
    <van-popup
    :value="value"
    @input="$store.commit('setShowReplyList',$event)"
    position="bottom"
    :style="{height: '80%'}"
    >
    回复
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ReplyList',
  props: ['value']
}
</script>

<style>
</style>
.
