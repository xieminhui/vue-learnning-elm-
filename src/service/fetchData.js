import fetch from '../config/fetch'

/*
*  获取定位，热门城市，所有城市
* */

export const guessCity = (type) => fetch('/v1/cities', {
    type: type
})


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user');

/*
* 获取所选城市的名字
* */
export const getCityInfoByid = (number) =>fetch('/v1/cities/' + number);

/*
*  搜索地址
* */
export const getAddressBySearch = (city_id, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: city_id,
    keyword: value
})

