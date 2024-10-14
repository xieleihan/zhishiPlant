<template>
    <div class="looktext">
        <TapNav @showShare="handleShowShare"></TapNav>
        <TextContainer />
        
    </div>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />
</template>

<script setup lang="ts">
import TapNav from '@/components/LookText/TapNav.vue';
import TextContainer from '@/components/LookText/TextContainer.vue';
import { ref } from 'vue';

const showShare = ref(false);
const options = [
    [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
    ],
    [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
    ],
];

function handleShowShare(status: boolean) {
    showShare.value = status;
}
</script>

<style scoped lang="less">
    .looktext{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        // padding-top: 50px;
        position: relative;
        background-color: skyblue;
    }
</style>