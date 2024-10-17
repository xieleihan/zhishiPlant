<template>
    <div class="leftcom">
        <van-collapse v-model="activeNames">
            <van-collapse-item class="bgColor" title="用户管理" name="1" icon="friends-o">
                <div class="smallcard" @click="setIndex(0)" :class="cell.isIndex === 0 ? 'active':''">账户管理</div>
                <div class="smallcard" @click="setIndex(1)" :class="cell.isIndex === 1 ? 'active':''">信息管理</div>
            </van-collapse-item>
            <van-collapse-item class="bgColor" title="添加卡片" name="2" icon="coupon-o">
                <div class="smallcard" @click="setIndex(2)" :class="cell.isIndex === 2 ? 'active' : ''">首页添加</div>
                <div class="smallcard" @click="setIndex(3)" :class="cell.isIndex === 3 ? 'active' : ''">发送信息</div>
            </van-collapse-item>
            <van-collapse-item class="bgColor" title="状态管理" name="3" icon="cluster-o">
                <div class="smallcard" @click="setIndex(4)" :class="cell.isIndex === 4 ? 'active' : ''">服务器状态</div>
                <div class="smallcard" @click="setIndex(5)" :class="cell.isIndex === 5 ? 'active' : ''">系统设置</div>
            </van-collapse-item>
        </van-collapse>
        <div class="desc">Copyright© 2024 SouthAki,All right.</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCellStore } from '@/stores/cell';
const cell = useCellStore();

function setIndex(i: number){
    cell.toggle(i);
}

const activeNames = ref(['1']);


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
                &.active{
                    background-color: #2c7bed;
                    color: white;
                }
            }
        }
    }
</style>