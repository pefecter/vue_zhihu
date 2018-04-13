<template>
    <div class="scroll-loading-more">
        <div class="loader" v-show="loading">
            <svg class="loader-circular" viewBox="25 25 50 50">
                <!-- 用来创建一个圆 -->
                <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
        </div>
        <span v-show="loading" class="scroll-loading-more-text">{{loadingText}}</span>
    </div>
</template>

<script>
    import Scroll from './scroll'
    export default {
        name: 'scroll-loading-more',
        mixins: [Scroll], //组件混用
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            loadingText: {
                type: String,
                default: '正在加载...'
            }
        },
        methods: {
            onScroll() {
                if (this.loading) return
                const scroller = this.scroller
                const isWindow = scroller === window
                //用户滑动了的高度
                const scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
                //scroller.scrollHeight整个页面的滑动高度
                //document.documentElement.scrollHeight页面显示的总高度
                const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight
                //能滑动的高度
                let height = scrollHeight - scrollTop - 5
                //页面展示内容的高度
                let contentHeight = isWindow ? window.innerHeight : scroller.offsetHeight
                //当可滑动距离小于展示内容高度是传出加载更多事件
                if (height <= contentHeight) {
                    //触发滑动加载事件
                    this.$emit('load')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .scroll-loading-more {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 8px;
        line-height: 36px;
    }
    .scroll-loading-more-text {
        margin-left: 16px;
        font-size: 16px;
    }
    .loader {
        width: 30px;
        height: 30px;
        position: relative;
    }
    .loader-path {
        stroke-dasharray: 1, 200; //创建虚线
        stroke-dashoffset: 0; //定义虚线描边的偏移量
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round; //圆角
    }
    .loader-circular {
        animation: rotate 2s linear infinite;
        width: 100%;
        height: 100%;
        margin: auto;
        transform-origin: center center; //设置旋转元素的基点位置
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
    @keyframes color {
        0%,
        100% {
            stroke: #FFD300;
        }
        40% {
            stroke: #5B7492;
        }
        66% {
            stroke: #FFD300;
        }
        80%,
        90% {
            stroke: #acb9c8;
        }
    }
</style>
