<template>
    <div id="allmap"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

function loadBaiduMapScript() {
    return new Promise((resolve, reject) => {
        if (document.getElementById('baidu-map-script')) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.id = 'baidu-map-script';
        script.src = '//api.map.baidu.com/api?type=webgl&v=1.0&ak=5B3ZaUDtRoOhu8KAGiiI1YH3sQ5hBGJg';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Baidu Map script failed to load.'));
        document.body.appendChild(script);
    });
}

onMounted(async () => {
    try {
        await loadBaiduMapScript();
        // GL版命名空间为 BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        // @ts-ignore 方式 2: 忽略类型检查
        const map = new BMapGL.Map("allmap"); // 创建Map实例
        // @ts-ignore 方式 2: 忽略类型检查
        map.centerAndZoom(new BMapGL.Point(113.587386, 23.545283), 18); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped>
body,
html,
#allmap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
}
</style>