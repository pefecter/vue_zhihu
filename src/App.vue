<template>
  <div id='app'>
    <vue-drawer-layout ref="drawer" 
        :drawer-width="250" 
        :enable="true" 
        :animatable="true" 
        :z-index="0" 
        :drawable-distance="Math.floor(250/4)" 
        :content-drawable="true" 
        :backdrop="true" 
        :backdrop-opacity-range="[0,0.4]" 
        @slide-end="handleSlideEnd"
        @mask-click="handleToggleDrawer"
      >
        <div class="drawer-content" slot="drawer">
          <aside class="aside" :class="{docked:docked}">
            <ul>
              <li :class="{chose:num == 1}" @click="go(1)">
                <span>首页</span>
              </li>
              <li :class="{chose:num == list.id}" v-for="list in sortList" :key="list.id" @click="go(list.id)">
                <span>{{ list.name }}</span>
              </li>
            </ul>
          </aside>
        </div>
        <div slot="content">
          <transition :name="transitionName">
            <keep-alive include="article">
              <router-view class="app-view"></router-view>
            </keep-alive>
          </transition>
          <i v-if="!drawer" class="iconfont icon-ic_menu" @click="handleToggleDrawer"></i>
          <i v-if="drawer" class="iconfont icon-ic_back" @click="back()"></i>
        </div>
      </vue-drawer-layout>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import api from './api/index';
  export default {
    computed: {
      ...mapState({
        circle: state => state.circleFlag,
        num: state => state.num,
        drawer: state => state.drawer
      })
    },
    data() {
      return {
        sortList: [],
        docked: false,
        transitionName: 'slide-left'
      }
    },
    mounted() {
      api.getTopics().then(res => {
        this.sortList = res.data.others;
      })
    },
    methods: {
      handleSlideEnd(visible) {
        if(visible){
           this.docked = true;
        }else{
            this.docked = false;
        }
      },
      go(id) {
        let path = id == 1 ? 'home' : 'sort';
        this.$router.push({
          path: path,
          query: {
            id: id || ''
          }
        });
        this.$store.commit('add', id);
        this.handleToggleDrawer();
      },
      //侧滑点击显示/隐藏
      handleToggleDrawer() {
        this.docked = !this.docked;
        this.$nextTick(() => {
          this.$refs.drawer.toggle();
        });
      },
      //返回按钮
      back(n) {
        if (n) {
          this.$router.push({
            path: 'home'
          });
        } else {
          this.$router.go(-1);
          this.$store.commit("back", 1);
        }
      }
    }
  };
</script>

<style lang="less">
  .drawer-content {
    height: 100%;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50vw, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0.1;
    -webkit-transform: translate(-50vw, 0);
  }
  .app-view {
    z-index: 1;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: absolute;
    transition: transform 0.3s ease;
    -webkit-overflow-scrolling: touch;
  }
  .app-view-hidden {
    overflow: hidden;
  }
  .iconfont {
    color: #fff;
    font-size: 0.8rem;
    top: .3rem;
    position: relative;
    z-index: 1;
    left: .5rem;
  }
  .aside {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    visibility: hidden;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 90%;
      align-items: center;
    }
    li {
      width: 70%;
      cursor: pointer;
      text-align: center;
      font-size: 0.4rem;
      list-style: none;
      color: #666;
      &.chose {
        color: #ffd300;
      }
    }
    &.docked {
      visibility: visible;
    }
  }
  @media screen and (min-width: 640px) {
    .app-view {
      width: 640px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .aside ul {
      width: 350px;
    }
  }
</style>
