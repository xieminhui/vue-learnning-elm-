import {
    GET_USERINFO,
    SAVE_GEOHASH,
    SAVE_LATANDLON
} from './mutation-types'


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

}