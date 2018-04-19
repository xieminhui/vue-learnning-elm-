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

/*
* 根据经纬度获取城市信息
* */

export const fetchCityinfoBygeohash = (geohash) => fetch('/v2/pois/' + geohash);

/*
* 获取订餐分类
* */
export const fetchFoodType = () => fetch('/v2/index_entry');

/**
 * 获取msite商铺列表
 */
export const fetchShopList = (latitude, longitude, offset, restaurant_category_id='', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = [],limit = 20) =>{
    let supportStr = '';
    support_ids.forEach(item=>{
        if(item.status){
            supportStr += '$support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit,
        restaurant_category_id,
        order_by,
        delivery_mode,
        support_ids,
        restaurant_category_ids
    };
    return fetch('/shopping/restaurants', data);
}