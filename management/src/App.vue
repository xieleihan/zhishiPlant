<template>
  <div class="app">
    <StartpagesView v-if="homeStore.isOpen" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import StartpagesView from './views/StartpagesView.vue'

import { useHomeStore } from './stores/home'

const homeStore = useHomeStore();
</script>

<style scoped less>
  .app{
    width: 100dvw;
    height: 100dvh;
  }
</style>