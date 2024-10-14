<template>
    <div class="sms">
        <div class="container">
            <!-- 下面是模版 -->
            <ul>Today
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
            </ul>
            <ul>Yesterday
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
                <li>
                    <div class="left">
                        <img src="../../assets/images/avater.jpg" alt="">
                    </div>
                    <div class="right">
                        <div class="title">这是消息的标题</div>
                        <div class="info">这是消息预览</div>
                        <div class="date">2024-10-12 20:10:11</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .sms{
        width: 100%;
        height: calc(100% - 110px);
        // background-color: skyblue;
        overflow-y: scroll;
        .container{
            width: 100%;
            ul{
                margin-top: 10px;
                font-size: 30px;
                li{
                    width: 100%;
                    height: 80px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    justify-content: flex-start;
                    .left{
                        width: 80px;
                        height: 80px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 60px;
                            height: 60px;
                            aspect-ratio: 1/1;
                        }
                    }
                    .right{
                        position: relative;
                        width: calc(100% - 80px);
                        height: 80px;
                        padding: 10px 0;
                        .date{
                            color: #ccc;
                            position: absolute;
                            bottom: 5px;
                            right: 5px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>