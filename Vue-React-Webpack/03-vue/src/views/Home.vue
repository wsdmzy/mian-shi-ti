<template>
  <div class="home">
    {{num}}
    <CostomV v-model="num" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CostomV from './CostomV'

export default {
  name: 'Home',
  components: {
    CostomV
  },
  data() {
    return {
      num: ""
    }
  }
}
</script>
