<template>
  <div class="app">
    <StartPagesView v-if="homeStore.isOpen"></StartPagesView>
    <layoutView v-if="!homeStore.isOpen" class="layout" />
  </div>
</template>

<script setup lang="ts">
import StartPagesView from './views/StartPagesView.vue';
import layoutView from './LayoutView.vue';
import { onMounted } from 'vue';

onMounted(() => {
  homeStore.close();
})

// import { storeToRefs } from 'pinia';
import { useHomeStore } from './stores/home'

const homeStore = useHomeStore();


</script>

<style lang="less" scoped>
.app{
  width: 100%;
  height: 100%;
}
</style>