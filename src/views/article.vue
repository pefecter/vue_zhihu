<template>
    <div class="cont">
        <div class="cont-img" v-if="data.image">
            <img :src="data.image">
            <div class="cont-img-mask"></div>
            <h2>{{ data.title }}</h2>
        </div>
        <div class="body" v-html="data.body"></div>
        <!-- loading -->
        <loading v-if="!data.body"></loading>
        <!-- 返回顶部 -->
        <back-button :scroller="scroller" :flag="circle"></back-button>
    </div>
</template>

<script>
    import api from './../api/index'
    import {
        mapState
    } from "vuex";
    export default {
        computed: mapState({
            circle: state => state.circleFlag,
            article: state => state.article,
            docked: state => state.docked
        }),
        data() {
            return {
                data: '',
                scroller: window
            }
        },
        activated: function() {
            let id = this.$route.query.id;
            if (this.article.hasOwnProperty(id)) {
                this.data = this.article[id];
            } else {
                api.getNewsById(id).then(res => {
                    console.log(res.data)
                    this.data = res.data;
                })
            }
        },
        deactivated: function() {
            this.data = "";
        },
        mounted() {
            this.scroller = this.$el;
        },
    }
</script>
<style lang="less">
    @red: #fc4482;
    @yellow: #ffd300;
    @blue: #5b7492;
    @gray: #acb9c8;
    img {
        width: 100%;
    }
    .cont {
        height: 100vh;
        color: #666;
        .cont-img {
            height: 6rem;
            overflow: hidden;
            position: relative;
            img {
                width: 100%;
                position: relative;
                top: 50%;
                transform: translate(0, -50%)
            }
            h2 {
                width: 60%;
                margin: 0;
                padding: 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.45rem;
                text-align: right;
                position: absolute;
                right: 5%;
                bottom: 1rem;
                text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            }
            &-mask {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(91, 116, 146, 0.5)
            }
        }
        .body {
            padding: 5%;
            position: relative;
            h2,
            li,
            p {
                text-align: justify !important;
            }
            h2 {
                color: @blue;
                position: relative;
                z-index: 1;
            }
            a {
                color: @yellow;
                word-break: break-word; //自动换行的处理
            }
            .headline-title {
                color: @blue;
            }
            .meta {
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                .avatar {
                    width: 0.6rem;
                    margin-right: .1rem;
                    display: inline-block;
                    vertical-align: middle; //设置元素的垂直对齐方式
                }
                span {
                    color: #666
                }
                .author {
                    color: @red;
                    display: inline-table;
                }
            }
            .content {
                font-size: .35rem;
            }
            .question {
                blockquote {
                    text-align: justify;
                    position: relative;
                    &::before {
                        content: "";
                        height: 100%;
                        display: block;
                        border-left: .1rem solid @yellow;
                        position: absolute;
                    }
                }
                &:first-child {
                    padding-top: 0;
                }
                &:last-child {
                    padding-bottom: 0;
                    &::before {
                        display: none;
                    }
                }
                ul {
                    padding-left: .3rem;
                    li {
                        text-align: left;
                    }
                }
            }
            .content-image {
                width: 100%;
                margin: 0 auto;
                display: block;
            }
            .view-more {
                margin-bottom: .5rem;
                text-align: center;
                a {
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }
</style>
