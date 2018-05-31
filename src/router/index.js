import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop');
const foodDetail = r => require.ensure([], () => r(require('../page/shop/foodDetail')), 'foodDetail');
const shopDetail = r => require.ensure([], () => r(require('../page/shop/shopDetail')), 'shopDetail');
const shopSafe = r => require.ensure([], () => r(require('../page/shop/shopSafe')), 'shopSafe');
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const chooseAddress  = r => require.ensure([], () => r(require('../page/confirmOrder/chooseAddress')), 'chooseAddress')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        //点击城市
        {
            path: '/city/:cityId',
            component: city
        },
        //商铺列表
        {
            path: '/msite',
            component: msite
        },
        //商铺详情页
        {
            path: '/shop',
            component:shop,
            children: [{
                path: 'foodDetail',//食物详情页
                component: foodDetail,
            }, {
                path: 'shopDetail',//商铺详情页
                component: shopDetail,
                children: [{
                    path: 'shopSafe',//商铺安全认证页
                    component: shopSafe
                }]
            }]
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component: confirmOrder,
            children: [{
                path: 'chooseAddress',//选择地址
                component: chooseAddress
            }]
        }
    ]
}]
