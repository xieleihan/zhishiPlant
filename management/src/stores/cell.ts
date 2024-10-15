// 导入定义存储模块的函数
import { defineStore } from 'pinia'

export const useCellStore = defineStore({
    // 模块的id
    id: "cell",
    // 定义存储对象
    state: () => ({
        isIndex: 0, // left的索引值
        listBox: [0], // 存储列表
    }),

    actions: {
        toggle(index: number) {
            this.isIndex = index;
        },
        arrpush(index: number) {
            this.listBox.push(index); // 往数组后面添加元素
        },
        removearr(index: number) {
            this.listBox.splice(index, 1); // 删除数组中指定的元素
        }
    }
    
})