<template>
    <div class="itemBox">
        <div class="item">
            <van-icon name="fire-o" />
            <span>推广</span>
        </div>
        <div class="item">
            <van-icon name="gift-o" />
            <span>礼物</span>
        </div>
        <div class="item">
            <van-icon name="todo-list-o" />
            <span>任务</span>
        </div>
        <div class="item">
            <van-icon name="phone-circle-o" />
            <span>加州来电</span>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .itemBox{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 10px;
        padding-bottom: 5px;
        background-color: white;
        border-bottom: 1px solid #ccc;
        .item{
            display: flex;
            flex-direction: column;
            font-size: 20px;
            align-items: center;
            border-right: 1px solid #ccc;
            width: calc(100% / 4 - 2px);
            span{
                margin-top: 5px;
            }
            &:nth-child(4){
                border-right: none;
            }
        }
    }
</style>