<template>
    <div class="news">
        <p class="title"><span>每日新闻</span></p>
        <ul class="containerBox">
            <div class="container">
                <li v-for="(item,index) in newsArr" :key="index">
                    <div class="left">
                        <img :src="`${item.picUrl}`" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">{{ item.title }}</div>
                        <p>{{ item.source }}</p>
                        <div class="date">{{ item.ctime }}</div>
                    </div>
                </li>
                <!-- 以下是测试用的列表 -->
                <!-- <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="https://picsum.photos/1920/1080?1" alt="">
                    </div>
                    <div class="right">
                        <div class="newtitle">这这是标题这是标题这题这题这题这是标题这是标题是标题</div>
                        <p>国内热点</p>
                        <div class="date">2024-10-07 20:10:20</div>
                    </div>
                </li> -->
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDailyArr(): Promise<Array<any>> {
    try {
        // const res = await axios.get(`https://apis.tianapi.com/guonei/index?key=${api_key}&num=10`);
        const res = await axios.get('https://fastly.jsdelivr.net/gh/southaki/contentDeliveryNetwork@0.0.14/vueProjectPoint(test)/newList.json');
        const length = res.data.result.newslist.length;
        
        const arr = [];
        for (let i = 0; i < 10; i++) {
            const getRandomNumber = Math.floor(Math.random() * length);
            arr.push(res.data.result.newslist[getRandomNumber]);
        }
        // console.log(arr);
        return arr;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// 每日日报的变量
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newsArr = ref<Array<any>>([]);
// const api_key: string = '2d045baed79976ae7435aed504b2c50e';

onMounted(async () => {
    // 获取每日日报
    newsArr.value = await getDailyArr();
});
</script>

<style scoped lang="less">
@import "../public/main.less";
    .news{
        width: 100%;
        margin-top: 15px;
        padding: 0 20px;
        .title{
            width: 100%;
            border-bottom: 1px solid #ccc;
            margin-bottom: 15px;
            span{
                font-size: 20px;
                font-weight: bold;
            }
        }
        .containerBox{
            width: 100%;
            height: 480px;
            overflow: hidden;
            .container{
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                scrollbar-width: none;
                li{
                    width: 100%;
                    height: 150px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: @radius;
                    padding: 10px 10px;
                    margin-bottom: 10px;
                    .left{
                        display: flex;
                        align-items: center;
                        img {
                            height: 120px;
                            aspect-ratio: 4/3;
                            border-radius: @radius 0 0 @radius;
                            margin-right: 10px;
                        }
                    }
                    .right{
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .newtitle{
                            font-size: 16px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                        }
                        p{
                            width: 100%;
                            text-align: right;
                        }
                        .date{
                            color: #ccc;
                            font-size: 10px;
                            width: 100%;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>