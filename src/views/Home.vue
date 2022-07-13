<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <UploadImages v-if="getUser" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import UploadImages from '@/components/UploadImages.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    UploadImages
  },
  computed: {
    ...mapGetters(['getUser']),
  },
}
</script>
