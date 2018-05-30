import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['@/components/Index'], resolve)
const History = resolve => require(['@/components/History'], resolve)
const NotFound = resolve => require(['@/components/NotFound'], resolve)
const Music = resolve => require(['@/components/Music'], resolve)
const Moive = resolve => require(['@/components/moive/Moive'], resolve)
const MovieDetail = resolve => require(['@/components/moive/MovieDetail'], resolve)


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            rediect: '/home'
        },
        {
            path: '/home',
            name: '首页',
            component: Index
        },
        {
            path: '/moive',
            name: '电影',
            component: Moive,
        },
        {
            path: '/moive/detail/:id',
            name: '电影详情',
            component: MovieDetail,
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path:'/music',
            name:'Music',
            component:Music
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
        }
    ]
})