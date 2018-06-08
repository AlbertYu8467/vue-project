import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/Layout'], resolve)
const Index = resolve => require(['@/components/Index'], resolve)
const History = resolve => require(['@/components/History'], resolve)
const NotFound = resolve => require(['@/components/NotFound'], resolve)
const Live = resolve => require(['@/components/Live'], resolve)
const LiveItem = resolve => require(['@/components/LiveItem'], resolve)
const Music = resolve => require(['@/components/Music'], resolve)
const TearCloth = resolve => require(['@/components/TearCloth.vue'], resolve);
const FiveChess = resolve => require(['@/components/FiveChess.vue'], resolve);
const Moive = resolve => require(['@/components/moive/Moive'], resolve)
const MovieDetail = resolve => require(['@/components/moive/MovieDetail'], resolve)


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: '',
            component: Layout,
            children: [{
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
                    path: '/music',
                    name: 'Music',
                    component: Music
                },
                {
                    path: '/tearcloth',
                    component: TearCloth,
                    name: '信仰之跃',
                },
                {
                    path: '/five',
                    component: FiveChess,
                    name: '五子棋',
                },
                {
                    path: '/live',
                    component: Live,
                    name: '直播',
                    children: [{
                        path: '/live/detail/:id',
                        component: LiveItem,
                        name: 'LiveItem'
                    }]
                },
            ]
        },

        {
            path: '*',
            name: '404',
            component: NotFound,
        }
    ]
})