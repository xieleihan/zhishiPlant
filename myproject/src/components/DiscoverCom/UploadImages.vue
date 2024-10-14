<template>
    <div class="upload">
        <van-uploader v-model="fileList" multiple :max-count="5" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const fileList = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    { url: 'https://cloud-image', isImage: true },
]);
</script>

<style scoped lang="less">
    .upload{
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: row;
        overflow-y: scroll;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
</style>