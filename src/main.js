import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import swipe from './components/swipe/swipe'
import loading from './components/loading'
import scrollLoadingMore from './components/scrollLoadingMore'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.component(swipe.name, swipe)
Vue.component(loading.name, loading)
Vue.component(scrollLoadingMore.name, scrollLoadingMore)
const store = new Vuex.Store({
    state: {
        num: 1,
        drawer: false, //抽屉显示
        circleFlag: false, //返回顶部按钮
        theme: {}, //侧边栏
        article: {},
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