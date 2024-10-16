<template>
    <div class="homeinfo">
        <van-uploader v-model="fileList" multiple :max-count="5" />

        <input class="HomeTitle" type="text" placeholder="请输入标题">

        <textarea class="HomeTextarea" name="" id="" placeholder="请输入文章"></textarea>

        <TypeBox />

        <div class="btnBox">
            <button class="submit">提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TypeBox from './TypeBox.vue';

const fileList = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
]);
</script>

<style scoped lang="less">
@import '../../public/publiccss.less';
    .homeinfo{
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        .HomeTitle{
            width: 100%;
            border: none;
            outline: none;
            border-bottom: 1px solid #ccc;
            margin: 10px 0;
            padding-left: 10px;
            padding-bottom: 5px;
        }
        .HomeTextarea{
            width: 100%;
            height: 150px;
            resize: none;
            padding: 10px;
        }
        .btnBox{
            width: 100%;
            display: flex;
            justify-content: end;
            .submit {
                width: 100px;
                height: 40px;
                background-color: @googleGreen;
                color: white;
                border: none;
                border-radius: @radius;
            }
        }
    }
</style>