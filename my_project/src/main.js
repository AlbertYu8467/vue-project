// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios';
import '@/assets/js/util.js';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/assets/css/app.css'

axios.defaults.headers.common['Accept'] = "application/json;charset=utf-8";
Vue.prototype.axios = axios

Vue.use(ElementUI);
Vue.config.productionTip = false

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.matched.length === 0) {
        next({ path: '/404' });
    } else if (true) {
        document.title = to.name ? (to.name + ' | Albert') : 'Albert';
        next();
    }
})
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})