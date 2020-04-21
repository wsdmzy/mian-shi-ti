<template>
  <div>
    <input 
      :value="num"
      @input="$emit('change',$event.target.value)"
      type="text">
  </div>
</template>

<script>
export default {
  model: {
    prop: "num",
    event: "change"
  },
  props: {
    num: {
      type: String,
      default: 0
    }
  }
}
</script>

<style>

</style>