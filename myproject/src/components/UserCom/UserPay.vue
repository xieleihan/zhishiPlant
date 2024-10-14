<template>
    <div class="pay">
        <div class="left">
            <img src="../../assets/icon/payment.png" alt="">
            <span>星球支付</span>
        </div>
        <div class="right">
            <img src="../../assets/icon/向左箭头black.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
    .pay{
        width: 100%;
        height: 50px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background-color: white;
        .left{
            display: flex;
            flex-direction: row;
            align-items: center;
            img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }
        .right{
            transform: rotate(180deg);
            display: flex;
            align-items: center;
            img{
                width: 20px;
                height: 20px;
            }
        }
    }
</style>