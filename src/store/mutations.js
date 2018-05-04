import {
    GET_USERINFO,
    SAVE_GEOHASH,
    SAVE_LATANDLON,
    INIT_BUYCART
} from './mutation-types'
import {getItem, setItem} from '../config/myUtils'

export default {
    //获取用户信息
    [GET_USERINFO](state, info){

    },
    //保存geohash
    [SAVE_GEOHASH](state, geohash){
        state.geohash = geohash;
    },
    //保存经纬度
    [SAVE_LATANDLON](state, info){
        state.latitude = info.latitude;
        state.longitude = info.longitude;
    },
    //从localstorage取出初始化购物车
    [INIT_BUYCART](state){
        let initData = getItem('buyCart');
        if(initData){
            state.carList = initData;
        }
    }
}