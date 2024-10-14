<template>
    <div class="daily">
        <p class="title"><span>每日日报</span></p>
        <ul class="containerBox">
            <div class="container">
                <li @click="getUrl(item)" v-for="(item, index) in dailyArr" :key="index"
                    :style="`background: url(${item.images[0]});background-repeat:no-repeat;background-size:cover`">
                    <!-- <img :src="`${item.images[0]}`" alt="" /> -->
                    <div class="mask" :style="`background: linear-gradient(transparent, ${setColor(item.image_hue)});`">
                        <div class="cardTitle">{{ item.title }}</div>
                        <div class="hint">{{ item.hint }}</div>
                    </div>
                </li>
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import router from '../router/index';

// 导入pinia
import { useHomeStore } from '../stores/home'
const homeStore = useHomeStore();

function setColor(hex: string): string {
    // 将颜色字符串去掉前面的 "0x"
    hex = hex.replace(/^0x/, '');
    // 如果长度不足 6 位，前面补足 0
    hex = hex.padStart(6, '0');
    // 加上 "#"
    hex = `#${hex}`;
    return hex;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUrl(item:any): void {
    // console.log(item.url) // 获取每周日报的URL
    // homeStore.open();
    // homeStore.startClose();
    homeStore.homeLookOpen();
    homeStore.setTitle(item.title);
    router.push({ name: 'detail', query: { url: item.url } });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDailyArr(): Promise<Array<any>> {
    try {
        const res = await axios.get('https://apis.netstart.cn/zhihudaily/stories/latest');
        // console.log(res);
        const length = res.data.stories.length;
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(res.data.stories[i]);
        }
        return arr;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// 每日日报的变量
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dailyArr = ref<Array<any>>([]);

onMounted(async () => {
    // 获取每日日报
    dailyArr.value = await getDailyArr();
});

</script>


<style scoped lang="less">
@import "../public/main.less";
    .daily{
        width: 100%;
        padding: 0 20px;
        padding-top: 10px;
        .title{
            width: 100%;
            border-bottom: 1px solid #ccc;
            text-align: left;
            span{
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 3px;
            }
        }
        .containerBox{
            width: 100%;
            height: 520px;
            margin-top: 10px;
            // background-color: skyblue;
            .container{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 48%;
                    height: 250px;
                    border-radius: @radius;
                    position: relative;
                    margin-bottom: 10px;
                    .mask{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        border-radius: @radius;
                        display: flex;
                        flex-direction: column;
                        justify-content: end;
                        padding: 0 5px;
                        padding-bottom: 5px;
                    }
                    .cardTitle {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        margin-bottom: 15px;
                        mix-blend-mode: difference;
                        color: white;
                    }
                    .hint {
                        display: flex;
                        flex-wrap: nowrap;
                        text-wrap: nowrap;
                        font-size: 14px;
                        color: #ccc;
                        text-align: right;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>