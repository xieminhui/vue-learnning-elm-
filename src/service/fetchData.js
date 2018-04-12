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


