import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            component: home,
            name: 'home'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
export default router