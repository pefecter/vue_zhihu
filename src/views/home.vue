<template>
    <div>
        <m-swipe swipeid="swipe" ref="swiper">
            <div @click="toGo(top.id)" v-for="top in tops" :key="top.id" class="swiper-slide" slot="swiper-con">
                <img :src="top.image" alt="">
                <div></div>
                <h3>{{top.title}}</h3>
            </div>
        </m-swipe>
        <div class="list" v-for="list in lists" :key="list.id">
            <p class="list-time">{{list.date.substring(0,4)+"/"+list.date.substring(4,6)+"/"+list.date.substring(6,8)}}</p>
            <div class="list-ico" v-for="item in list.stories" :key="item.id">
                <img :src="item.images[0]" alt="">
                <p>{{item.title}}</p>
            </div>
        </div>
        <!-- loading -->
        <loading v-if="!lists.length"></loading>
        <!-- 滑动加载更多组件 -->
        <scroll-loading-more :scroller="scroller"></scroll-loading-more>
    </div>
</template>

<script>
    import api from './../api/index'
    import {
        mapState
    } from "vuex";
    export default {
        computed: {
            ...mapState({
                circle: state => state.circleFlag
            })
        },
        mounted() {
            this.getList(1);
            //滑动加载的区域
            this.scroller = this.$el; 
            let swiper = this.$refs.swiper;
            console.log(this.scroller)
        },
        data() {
            return {
                // refreshing: false,
                // trigger: null,
                loading: false,
                count: 1,
                swiper: "", //banner滑动
                tops: [], // 顶部banner
                lists: [], // 文章列表
                scroller: null, // 返回顶部
            }
        },
        methods: {
            toGo() {
                this.$router.push({
                    path: 'article',
                    query: {
                        id: id
                    }
                });
            },
            //获取文章信息
            getList(data) {
                api.getNews().then(res => {
                    console.log(res);
                    this.tops = res.data.top_stories;
                    this.lists.push(res.data);
                    // this.loading = false;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @yellow: #FFD300;
    @blue: #5B7492;
    @gray: #acb9c8;
    .app-view {
        .swiper-container {
            width: 100%;
        }
        .swiper-slide {
            height: 8rem;
            overflow: hidden;
            position: relative;
        }
        .swiper-container-horizontal>.swiper-pagination-bullets {
            bottom: .6rem;
            width: 95%;
            text-align: right;
        }
        .list:nth-child(2) {
            margin-bottom: 0;
            padding-top: 0;
            .list-time {
                top: -.8rem;
                z-index: 1;
            }
        }
    }
    .swiper-slide {
        div {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            opacity: 0.4;
            background-color: @blue;
        }
        img {
            width: 100%;
            top: 50%;
            position: relative;
            transform: translate(0, -50%)
        }
        h3 {
            width: 70%;
            color: #fff;
            margin: 0;
            font-size: .5rem;
            line-height: 1rem;
            position: absolute;
            right: 5%;
            bottom: 1.6rem;
            text-align: right;
            text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
            &:before {
                content: '';
                width: 3rem;
                bottom: -.3rem;
                right: 0;
                display: block;
                position: absolute;
                border: 2px solid @yellow
            }
        }
    }
    .list {
        width: 90%;
        position: absolute;
        padding-top: .8rem;
        margin: .8rem auto 0 .5rem;
        &-time {
            top: 0;
            margin: 0;
            color: #fff;
            padding: 0 1rem;
            line-height: 0.8rem;
            font-size: 0.4rem;
            border-radius: 0.4rem;
            text-align: center;
            letter-spacing: .1rem;
            background-color: @yellow;
            transform: translate(0, -50%);
            position: absolute;
            box-shadow: 0 3px 10px 0 rgba(91, 115, 146, .15)
        }
        &-ico {
            cursor: pointer;
            display: flex;
            padding: 0.3rem;
            margin-bottom: 0.4rem;
            border-radius: 0.15rem;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
            img {
                width: 2rem;
                margin-right: 0.4rem;
            }
            p {
                color: @blue;
                font-size: 0.4rem;
                text-align: justify;
                margin: 0;
            }
        }
    }
   
</style>
