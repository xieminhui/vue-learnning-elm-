import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/index'
import { routerMode } from './config/env'
import './config/rem'
/* 解决移动端click 300ms延迟 */
import FastClick from 'fastclick'

if('addEventListener' in document){
    document.addEventListener('DOMContentLoader', function () {
        FastClick.attach(document.body);
    },false);
}

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production'
})

new Vue({
    router,
    store,
}).$mount('#app')
