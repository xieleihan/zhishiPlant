<template>
    <div class="state">
        <div class="stateContainer clearfix">
            <div class="card fl">
                账户管理
                <div class="icon">
                    <van-icon name="close" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import '../../public/publiccss.less';
    .state{
        width: 95%;
        height: 50px;
        position: absolute;
        top: 30px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid @themeColor;
        // border-radius: @radius;
        overflow: hidden;
        .stateContainer{
            height: 30px;
            // min-width: 100%;
            overflow-x: scroll;
            color: white;
            .card{
                cursor: default;
                width: 100px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: @themeColor;
                position: relative;
                margin-right: 8px;
                &:last-child{
                    margin-right: 0;
                }
                .icon{
                    cursor: pointer;
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    color: @themeColor;
                    width: 10px;
                    height: 10px;
                    text-align: center;
                    line-height: 10px;
                }
            }
        }
    }
</style>