import Vue from 'vue'
import Home from '../pages/Home'
import ArticleDetail from "../pages/ArticleDetail"
import ThemeDetail from "../pages/ThemeDetail.vue"
import Router from 'vue-router'

Vue.use(Router)
import "../assets/css/reset.css"
export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/articleDetail/:id',
            name: 'articleDetail',
            component: ArticleDetail
        },
        {
            path: '/themeDetail/:id',
            name: 'themeDetail',
            component: ThemeDetail
        },
    ]
})