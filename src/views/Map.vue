<template>
  <div class="home">
    <GoogleMap/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'

export default {
  name: 'home',
  components: {
    GoogleMap
  }
}
</script>
