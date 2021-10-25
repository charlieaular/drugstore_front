<template>
  <Sidebar>
    <template v-slot:content>
      <router-view />
    </template>
  </Sidebar>
</template>

<script>
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar,
  }
}
</script>
