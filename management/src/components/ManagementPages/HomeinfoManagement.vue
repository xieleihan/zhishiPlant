<template>
    <div class="homeinfo">
        <van-uploader v-model="fileList" multiple :max-count="5" />

        <input v-model="title" class="HomeTitle" type="text" placeholder="请输入标题">

        <textarea v-model="desc" class="HomeTextarea" name="" id="" placeholder="请输入文章"></textarea>

        <TypeBox />

        <div class="btnBox">
            <button @click="sendHomedb" class="submit">提交</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, toRaw } from 'vue';
import TypeBox from './TypeBox.vue';
import axios from 'axios';
import { useTypeStore } from '@/stores/type';
const typeStore = useTypeStore();

function sendHomedb() {
    // @ts-ignore
    console.log(img, title, desc, type, username, avater, likenum, other, commentid);
    const payload = {
        // @ts-ignore
        img: toRaw(img), // 转换响应式数据为普通数据
        title: toRaw(title.value),
        info: toRaw(desc.value),
        type: toRaw(type.value),
        username: toRaw(username),
        avater: toRaw(avater),
        likenum: toRaw(likenum),
        other: toRaw(other),
        commentid: toRaw(commentid)
    };
    try {
        console.log(JSON.stringify(payload));
    } catch (error) {
        console.error("Circular reference found", error);
    }
    // @ts-ignore
    axios.post('https://frp-leg.top:26112/protected/addhomeinfo',
        payload,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZW1haWwiOiIyMjIiLCJpYXQiOjE3MjkxNTcwNzIsImV4cCI6MTcyOTE2MDY3Mn0.Si7kk-99Br8acdddaTCWPMHWqWABRWlUP3XceWdskik` // 如果使用 Bearer Token
            },
            
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

const title = ref('');
const desc = ref('');
const type = ref('首页');
const username = "官方发布"
const avater = "https://github.com/xieleihan/QingluanSearch-AndroidDev/raw/main/peacock_flat.png"
const likenum = Math.floor(Math.random() * 1000);
const other = Math.floor(Math.random() * 1000);
const commentid = Math.floor(Math.random() * 1000);
// @ts-ignore
const img = [];


watch(() => typeStore.typename, (value) => {
    // console.log(value);
    type.value = value;
});

const fileList = ref([
    
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
]);

watch(() => fileList.value, (value) => {
    const length = value.length;
    for (let i = 0; i < length; i++){
        // @ts-ignore
        // console.log(value[i].content);
        img.push(value[i].content);
    }
});
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