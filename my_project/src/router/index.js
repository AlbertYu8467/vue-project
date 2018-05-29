import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Moive from '@/components/moive/Moive'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/moive',
            name: 'Moive',
            component: Moive
        },
        {
            path: '/history',
            name: 'History',
            component: History
        }
    ]
})