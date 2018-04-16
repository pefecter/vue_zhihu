<template>
    <div>
        <div v-if="flag" class="circle" @click="backTop()">
            <i class="iconfont icon-ic_top"></i>
        </div>
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
            //返回顶部
            backTop() {
                let vue = this;
                let dom = document.querySelector('.app-view');
                let height = dom.scrollTop;
                let scrollTop = parseInt(height / 50);
                let time = setInterval(function() {
                    height -= scrollTop;
                    if (height <= 0) {
                        dom.scrollTop = 0;
                        vue.$store.commit('toggle');
                        clearInterval(time);
                    } else {
                        dom.scrollTop = height;
                    }
                }, 1);
            }
        }
    }
</script>
<style lang="less">
    .circle{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    // top: 0;
    right: 5%;
    bottom: 5vw;
    position: fixed;
    z-index: 10;
    i {
      top: 50%;
      left: 50%;
      font-size: 0.6rem;
      color: #acb9c9;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
</style>

