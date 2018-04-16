import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import DrawerLayout from "vue-drawer-layout" //
import swipe from './components/swipe/swipe'
import loading from './components/loading'
import scrollLoadingMore from './components/scrollLoadingMore'
import backButton from './components/backButton'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(DrawerLayout)
Vue.component('m-swipe', swipe)// Vue.component(swipe.name, swipe)
Vue.component('loading', loading)
Vue.component('scroll-loading-more', scrollLoadingMore)
Vue.component('back-button', backButton)
const store = new Vuex.Store({
    state: {
        num: 1,
        drawer: false, //抽屉显示
        circleFlag: false, //返回顶部按钮
        docked: false, //侧边栏显示
        article: {},
        sort: {},
        before: ''
    },
    //    改变Vuex store 状态的方式
    mutations: {
        add: (state, n) => state.num = n,
        back(state, n) { //列表、返回按钮切换
            if (n) {
                state.drawer = false
            } else {
                state.drawer = true
            }
        },
        toggle(state, n) { //显示返回顶部按钮
            if (n) {
                state.circleFlag = true
            } else {
                state.circleFlag = false
            }
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})