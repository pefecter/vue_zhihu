import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import article from './views/article'
import sort from './views/sort'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: "/",
      component: home,
      name: "home"
    },
    {
      path: "/article",
      component: article,
      name: "article"
    },
    {
      path: "/sort",
      component: sort,
      name: "sort"
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
export default router