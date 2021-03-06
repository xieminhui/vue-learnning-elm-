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

/*
* 获取某个商铺的详情
* */
export const shopDetails = shopId => fetch('/shopping/restaurant/' + shopId);

/*
*  获取shop页面的食物菜单列表
* */
export const foodMenu = restaurant_id => fetch('/shopping/v2/menu/', {
    restaurant_id
})

/*
*  获取某个店铺的评价分数
* */
export const ratingScores = shopId => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/scores');

/*
*  获取某个店铺的评价的所有分类
* */
export const ratingTags = shopId => fetch('/ugc/v2/restaurants/' + shopId + '/ratings/tags');

/*
*  获取某个店铺的所有评论列表
* */
export const ratingList = (shopId, offset = 0, tag_name = '', limit =10) => fetch('/ugc/v2/restaurants/' + shopId + '/ratings',{
    tag_name:encodeURIComponent(tag_name),
    offset,
    limit
})

/*
*  提交订单检查
* */
export const checkOut = (geohash, entities, restaurant_id) => fetch('/v1/carts/checkout', {
    geohash,
    entities,
    restaurant_id
}, 'POST')

/*
* 获取图片验证码
* */
export const getCaptchas = () => fetch('v1/captchas', {}, 'post');

/*
* 账号密码登录
* */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

/*
*  重置密码
* */
export const changePassWord = (username, oldpassWord, newpassword , confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword , confirmpassword, captcha_code}, 'POST')

/*
*  上传头像
* */
export const uploadImg = (user_id, data) => fetch('/eus/v1/users/' + user_id + '/avatar', data, 'POST');