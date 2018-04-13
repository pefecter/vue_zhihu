<template>
    <div class="circle" v-if="flag" @click="top()">
        <i class="iconfont icon-ic_top"></i>
    </div>
</template>

<script>
    import Scroll from './scroll'
    export default {
        name: 'back-button',
        mixins: [Scroll], //组件混用
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onScroll() {
                const scroller = this.scroller //滑动的Dom
                const isWindow = scroller === window
                //滑动半屏的高度
                const height = Math.ceil(window.screen.height / 2)
                //滑动的高度
                const scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
                // 页面滑动的位置，当页面滑动超过半屏高度之后，显示“返回顶部”按钮
                if (scrollTop > height) {
                    //修改store的状态
                    !this.flag && this.$store.commit('toggle', 1)
                } else {
                    this.flag && this.$store.commit('toggle')
                }
            },
            top() {
                let vm = this;
                let scroller = this.scroller;
                let height = scroller.scrollTop;
                let scrollTop = parseInt(height / 50); //每秒向上滑动的距离
                let time = setInterval(function() {
                    height -= scrollTop;
                    if (height <= 0) {
                        height = 0;
                        vm.$store.commit('toggle');
                        clearInterval(time);
                    } else {
                        scroller.scrollTop = height;
                    }
                }, 1);
            }
        }
    }
</script>
