<template>
    <div>
        <!-- loading -->
        <loading v-if="!lists"></loading>
        <div v-else>
            <div class="sort">
                <img :src="lists.image">
                <div></div>
                <h3>
                    <p>{{lists.description}}</p>
                    <p>{{lists.name}}</p>
                </h3>
            </div>
            <div class="list-ico" v-for="list in lists.stories" @click="toGo(list.id)" :key="list.id">
                <img v-if="list.images" :src="list.images" alt="">
                <p>{{list.title}}</p>
            </div>
        </div>
        <!-- 返回顶部 -->
        <back-button :scroller="scroller" :flag="circle"></back-button>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import api from './../api/index'
    export default {
        computed: {
            ...mapState({
                flag: state => state.num,
                circle: state => state.circleFlag,
                sort: state => state.sort,
                docked: state => state.docked
            })
        },
        data() {
            return {
                lists: '',
                scroller: window
            }
        },
        // activated: function() {
        //     let id = this.$route.query.id;
        //     console.log(id)
        //     if (this.sort.hasOwnProperty(id)) {
        //         this.lists = this.sort[id];
        //     } else {
        //         api.getTopicsById(id).then(res => {
        //             console.log(res.data.name)
        //             this.lists = res.data;
        //         })
        //     }
        // },
        // deactivated: function() {
        //     this.lists = "";
        // },
        watch: {
            //根据flag对应id的变化更新数据,防止缓存
            flag: function() {
                this.getList();
            }
        },
        mounted() {
            console.log(this.flag)
            this.scroller = this.$el;
            this.$store.commit('add', this.$route.query.id);
        },
        methods: {
            toGo(id) {
                //路由跳转
                this.$router.push({
                    path: "article",
                    query: {
                        id: id
                    }
                });
                //修改vuex中drawer的状态
                this.$store.commit("back");
                this.$store.commit('change');
            },
            getList() {
                let vue = this,
                    id = this.$route.query.id;
                // this.lists = '';
                // let dom = document.querySelector('.app-view');
                // dom.scrollTop = 0;
                api.getTopicsById(id).then(res => {
                    console.log(res.data.name)
                    this.lists = res.data;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @yellow: #FFD300;
    @blue: #5B7492;
    @gray: #acb9c8;
    .sort {
        height: 6rem;
        position: relative;
        overflow: hidden;
        div {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.4;
            position: absolute;
            background-color: @blue;
        }
        img {
            width: auto;
            height: 6rem;
            left: 15%;
            transform: translate(-50%, 0);
            position: relative;
        }
        h3,
        p {
            margin: 0;
        }
        h3 {
            width: 70%;
            color: #fff;
            font-size: 0.6rem;
            right: 5%;
            bottom: 0.3rem;
            text-align: right;
            position: absolute;
            text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
            p:first-child {
                position: relative;
                margin-bottom: 0.5rem;
                &:before {
                    content: "";
                    width: 3rem;
                    bottom: -.3rem;
                    right: 0;
                    display: block;
                    position: absolute;
                    border: 2px solid @yellow;
                }
            }
        }
    }
    .list {
        &-ico {
            width: 90%;
            position: relative;
            z-index: 1;
            margin: .8rem auto 0 .5rem;
            cursor: pointer;
            display: flex;
            padding: 0.3rem;
            border-radius: 0.15rem;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
            justify-content: center;
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
