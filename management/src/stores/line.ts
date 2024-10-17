// 导入定义存储模块的函数
import { defineStore } from 'pinia'

export const useLineStore = defineStore({
    // 模块的id
    id: "line",
    // 定义存储对象
    state: () => ({
        left: [] as string[], // 客服聊天存储
        right: [] as string[], // 用户聊天存储
        sum: [] as { role: string, content: string }[] // 聊天记录
    }),
    // 状态设置
    actions: {
        // 添加左侧聊天记录
        addLeft(value: string) {
            this.left.push(value);
            // 将左侧消息存入 sum 数组，role 为 "left"
            this.sum.push({ role: 'left', content: value });
        },
        // 添加右侧聊天记录
        addRight(value: string) {
            this.right.push(value);
            // 将右侧消息存入 sum 数组，role 为 "right"
            this.sum.push({ role: 'right', content: value });
        },
        // 清空左侧聊天记录
        clearLeft() {
            this.left = [];
            // 同时清除 sum 中所有 left 角色的聊天记录
            this.sum = this.sum.filter(record => record.role !== 'left');
        },
        // 清空右侧聊天记录
        clearRight() {
            this.right = [];
            // 同时清除 sum 中所有 right 角色的聊天记录
            this.sum = this.sum.filter(record => record.role !== 'right');
        }
    }
})