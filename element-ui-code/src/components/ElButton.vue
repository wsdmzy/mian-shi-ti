<template>
    <button
      class="el-button"
      :type="nativeType"
      :autofocus="autofocus"
      @click="handleClick"
      :class="[
        type ? 'el-button--'+type : '',
        buttonSize ? 'el-button--' + buttonSize : '',
        {
         'is-round': round,
         'is-plain': plain,
         'is-loading': loading
        }
      ]"
      >
    <i class="el-icon-loading" v-if="loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <!-- icon 光按钮 按钮slot-->
    <span v-if="$slots.default"><slot></slot></span>
    </button>

</template>

<script>
export default {
  name: 'ElButton',
  props: {
    loading: Boolean,
    size: String,
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      // default: submit
    },
    round: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    icon: String,
    autofocus: Boolean
  },
  computed: {
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click',evt)
    }
  }
}
</script>

<style>

</style>