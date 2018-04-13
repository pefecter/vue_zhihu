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
      @mask-click="handleMaskClick"
    >
      <div class="drawer-content" slot="drawer">
        <!-- 侧栏 -->
      </div>
      <div slot="content">
        <!-- 内容 -->
        <transition :name="transitionName">
           <keep-alive>
            <router-view class="app-view"></router-view>
          </keep-alive>
        </transition>
        <!-- 顶部按钮 -->
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
    data () {
      return {
        sortList:[],
        transitionName:'slide-left'
      }
    },
    mounted() {
      console.log(this.drawer)
    },
    methods: {
      handleToggleDrawer() {
        this.$nextTick(() => {
          this.$refs.drawer.toggle();
        });
      },
      //蒙层点击事件
      handleMaskClick() {
        this.$nextTick(() => {
          this.$refs.drawer.toggle();
        });
      },
      back(n) {
        if (n) {
          this.$router.push({
            path: 'home'
          });
        } else {
          this.$router.go(-1);
        }
      }
    }
  };
</script>

<style lang="less">
  .btn {
    position: absolute;
    display: block;
    border-radius: 5px;
    top: 5px;
    left: 5px;
    font-size: 14px;
    padding: 10px 12px;
    color: #333;
    background-color: #fff;
    text-decoration: none;
    z-index: 9999;
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
    z-index: 11;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    visibility: hidden;
    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      opacity: 0 !important;
    }
    ul {
      margin: 0;
      float: left;
      width: 60%;
      height: 100%;
      padding: 1.3rem 0.5rem 0.5rem;
      overflow: auto;
      background: rgba(91, 116, 146, 0.75);
      transform: translate(-100%, 0);
      transition: transform 0.3s ease;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        opacity: 0 !important;
      }
    }
    li {
      cursor: pointer;
      font-size: 0.43rem;
      list-style: none;
      color: #fff;
      margin-top: 20px;
      .iconfont {
        float: right;
        font-size: 0.6rem;
      }
      &.chose {
        color: #ffd300;
      }
    }
    .cover {
      width: 100%;
      height: 100%;
      opacity: 0;
      display: none;
      background: rgba(172, 185, 201, 0.4);
      transition: opacity 0.3s ease;
    }
    &.open {
      ul {
        transform: translate(0);
      }
      .cover {
        opacity: 1;
      }
    }
    &.docked {
      visibility: visible;
      .cover {
        display: block;
      }
    }
  }
  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
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
