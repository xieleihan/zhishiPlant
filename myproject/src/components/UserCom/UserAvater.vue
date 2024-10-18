<template>
    <div class="avaterBox">
        <div class="readBox">
            <img src="../../assets/icon/阅读.png" alt="">
            <span>阅读数据</span>
        </div>
        <div class="notification">
            <img src="../../assets/icon/notifications.png" alt="">
        </div>
        <div class="container" @click="rigthScroll">
            <div class="left">
                <img src="../../assets/images/avater.jpg" alt="">
            </div>
            <div class="right">
                <div class="username">这是用户名</div>
                <div class="infoBox">
                    <div class="useraddress">未知</div>
                    <div class="userdesc">这是用户描述</div>
                </div>
                <div class="rightBtn">
                    <img src="../../assets/icon/向左箭头black.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="runRoad">
        <div class="item">
            <div class="top">15</div>
            <div class="bottom">足迹</div>
        </div>
        <div class="item">
            <div class="top">15</div>
            <div class="bottom">回答</div>
        </div>
        <div class="item">
            <div class="top">15</div>
            <div class="bottom">收藏</div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
function rigthScroll(){
    console.log('点击了右侧按钮');
    
}
</script>

<style scoped lang="less">
    .avaterBox{
        width: 100%;
        height: 250px;
        position: relative;
        display: flex;
        align-items: end;
        background-color: white;
        .readBox{
            position: absolute;
            top: 28px;
            right: 52px;
            width: 100px;
            height: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background-color: #edfbf9;
            border-radius: 15px;
            img{
                width: 20px;
                height: 20px;
            }
            span{
                color: #84bfad;
            }
        }
        .notification{
            position: absolute;
            top: 30px;
            right: 15px;
            width: 25px;
            height: 25px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .container{
            width: 100%;
            padding: 0 20px;
            height: 200px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: start;
            .left{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                display: flex;
                width: calc(100% - 120px);
                flex-direction: column;
                justify-content: center;
                align-items: start;
                margin-left: 20px;
                position: relative;
                .rightBtn{
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    transform: translateY(-50%) rotate(180deg);
                    width: 15px;
                    height: 15px;
                    
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .username{
                    font-size: 20px;
                    font-weight: bold;
                }
                .infoBox{
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: center;
                    margin-top: 10px;
                    .useraddress{
                        color: #ccc;
                        margin-right: 10px;
                    }
                    .userdesc{
                        color: #ccc;
                    }
                }
            }
        }
    }
    .runRoad{
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        .item{
            height: 60px;
            width: calc(100% / 3 - 10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            .top{
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .bottom{
                color: #ccc;
            }
        }
    }
</style>