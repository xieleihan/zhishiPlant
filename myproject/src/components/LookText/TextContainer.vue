<template>
    <div class="textContainer">
        <div class="textContainerTitle">{{ title }}</div>
        <div class="textdesc">
            <div class="textAthor">作者/{{ author }}</div>
            <div class="linkToZhihu">进入「懂乎」查看原文</div>
        </div>
        <div class="html" v-html="body"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// 导入pinia
import { useHomeStore } from '../../stores/home'
const homeStore = useHomeStore();

const route = useRoute();
const body = ref('');
const author = ref('');
const title = ref('');
title.value = homeStore.title;

onMounted(() => {
    // 获取 URL 参数
    let url = route.query.url;

    if (Array.isArray(url)) {
        url = url[0]; // 如果是数组，取第一个元素
    }

    if (typeof url === 'string' && url.trim().length > 0) {
        // 发起请求，获取 `textObj` 内容
        fetchStoryData(url);
    } else {
        console.error("URL 参数无效");
    }
});

async function fetchStoryData(url: string) {
    try {
        console.log('请求数据:', url);
        const res = await axios.get(`https://frp-leg.top:26112/proxy?url=${encodeURIComponent(url)}`);
        // 解析服务器返回的数据
        if (res.data && res.data.code === 200 && typeof res.data.data === 'string') {
            extractHtmlContent(res.data.data);  // 继续提取 HTML 中的内容
        } else {
            console.log(res.data);
            console.error('服务器返回的数据格式不正确');
        }
    } catch (err) {
        console.error('请求失败:', err);
    }
}

function extractHtmlContent(html: string) {
    // 匹配 HTML 内容
    const regex = /<div class="content">([\s\S]*?)<\/div>/i;
    const match = html.match(regex);
    const authorRegex = /<span class="author">([^<]+)<\/span>/i;
    const authorMatch = html.match(authorRegex);

    // 提取作者信息
    if (authorMatch && authorMatch[1]) {
        const result = authorMatch[1].replace(/，$/, '');
        author.value = result;
    }

    // 提取内容并进行替换
    if (match && match[1]) {
        const extractedBody = match[1];
        const updatedBody = extractedBody
            .replace(/<img(.*?)class="(.*?)"(.*?)>/g, '<img$1class="myimg $2"$3>')
            .replace(/<img(?!.*class=")(.*?)>/g, '<img class="myimg"$1>');

        body.value = updatedBody; // 更新响应式 body 变量
    } else {
        console.error('未找到匹配的内容');
    }
}
</script>


<style scoped lang="less">
.textContainer {
    width: 90%;
    margin: 0 auto;

    .textContainerTitle {
        width: 100%;
        font-size: 18px;
        padding-top: 20px;
        font-weight: bold;
        line-height: 30px;
    }

    .textdesc {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        margin-top: 5px;

        .textAthor {
            font-size: 16px;
            margin-right: 10px;
            color: #a7a7a7;
        }

        .linkToZhihu {
            color: #3db9dc;
        }
    }

    .html {
        width: 100%;
        font-size: 16px;
        display: flex;
        flex-direction: column;

        .myimg {
            width: 100%;
        }
    }
}
</style>