import {
    GET_USERINFO,
    SAVE_GEOHASH,
    SAVE_LATANDLON,
    INIT_BUYCART,
    ADD_CART,
    REDUCE_CART,
    CLEAR_CART,
    RECORD_SHOPDETAIL
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
            state.cartList = initData;
        }
    },
    //添加购物车
    [ADD_CART](state,{
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock
    }){
        //这个组成的对象有点复杂，如下{餐馆(shopid)：{餐馆食物分类类别(category_id)：某个类别下的itemid(itemid)：某个类别下的食物id(foodid):{食物详情}}
        let cart = state.cartList;
        let shop = cart[shopid] = (cart[shopid] || {});
        let category = shop[category_id] = (shop[category_id] || {});
        let item = category[item_id] = (category[item_id] || {});
        if(item[food_id]){
            item[food_id]['num']++
        }else{
            item[food_id] = {
                'num': 1,
                'id': food_id,
                'name': name,
                'price': price,
                'specs': specs,
                'packing_fee': packing_fee,
                'sku_id': sku_id,
                'stock': stock
            }
        }
        state.cartList = {...cart};
        setItem('buyCart', state.cartList);
    },
    //移出购物车
    [REDUCE_CART](state,{
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
    }){
        let cart = state.cartList;
        let shop = (cart[shopid] || {});
        let category = (shop[category_id] || {});
        let item = (category[item_id] || {});
        if(item && item[food_id]){
            if(item[food_id]['num']>0){
                item[food_id]['num']--;
            }else{
                item[food_id] = {};
            }
            state.cartList = {...cart};
            setItem('buyCart', state.cartList);
        }
    },
    //清空购物车
    [CLEAR_CART](state, shopid){
        state.cartList[shopid] = null;
        setItem('buyCart', state.cartList);
    },
    //记录后台返回的商家店铺详情
    [RECORD_SHOPDETAIL](state, info){
        state.shopDetail = info;
    }
}