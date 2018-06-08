import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    userInfo: null, //用户信息
    login:true,//是否登录
    geohash:'wtw3sm0q087',//经纬度坐标组成的字符串
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
    cartList: {},//加入购物车的商品列表
    shopDetail: null,//商家店铺详情
    choosedAddress: null,//选择地址
    remarkText: null,//可选备注内容
    inputText:'',//输入备注内容
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})