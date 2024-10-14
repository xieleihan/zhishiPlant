<template>
    <div class="discover">
        <div class="title">
            上传
            <img src="../assets/icon/宇宙星球.png" alt="">
        </div>
        <div class="container">
            <UploadImages />
            <FromInput />
        </div>
    </div>
</template>

<script setup lang="ts">
import UploadImages from '@/components/DiscoverCom/UploadImages.vue';
import FromInput from '@/components/DiscoverCom/FromInput.vue';
</script>

<style scoped lang="less">
    .discover{
        width: 100%;
        height: 100%;
        position: relative;
        .title{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            position: fixed;
            top: 0;
            left: 0;
            font-size: 20px;
            img{
                width: 30px;
                height: 30px;
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
            }
        }
        .container{
            width: 100%;
            top: 50px;
            padding: 0 20px;
            position: absolute;
            height: calc(100% - 50px);
            background-color: #f3f7f8;
        }
    }
</style>