<template>
    <div class="leftcom">
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item class="bgColor" title="用户管理" name="1" icon="friends-o">
                <div class="smallcard">账户管理</div>
                <div class="smallcard">信息管理</div>
            </van-collapse-item>
            <van-collapse-item class="bgColor" title="添加卡片" name="2" icon="coupon-o">
                技术无非就是那些开发它的人的共同灵魂。
            </van-collapse-item>
            <van-collapse-item class="bgColor" title="状态管理" name="3" icon="cluster-o">
                在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
            </van-collapse-item>
        </van-collapse>
        <div class="desc">Copyright© 2024 SouthAki,All right.</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeName = ref('1');
const activeName2 = ref('1');
</script>

<style scoped lang="less">
@import "../../public/publiccss.less";
    .leftcom{
        width: 15%;
        height: 100%;
        background-color: #353e54;
        position: relative;
        border-right: 1px solid #ccc;
        .desc{
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: #ccc;
            text-wrap: nowrap;
            font-size: 0.7dvw;
        }
        .bgColor{
            .smallcard{
                width: 100%;
                height: 100%;
                color: black;
                border: 1px solid #ccc;
                padding: 10px 20px;
                border-radius: @radius;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
</style>