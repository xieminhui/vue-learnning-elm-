<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="goback" @click="goback">
                <svg width='4rem' height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke: rgb(255,255,255);stroke-width: 3;"/>
                </svg>
            </nav>
            <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14': '10'}">
                <img :src="shopListImgBaseUrl + shopDetailData.image_path" class="header_cover_img">
                <section class="description_header">
                    <router-link to="/shop/shopDetail" class="description_top" tag="li">
                        <section class="description_left">
                            <img :src="shopListImgBaseUrl + shopDetailData.image_path">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                            <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟到达/配送费¥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version='1.1' class="description_arrow">
                            <!--M:moveto L:lineto-->
                            <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                        <footer class="description_footer" v-if="shopDetailData.activities.length >0" @click="">
                            <p class="ellipsis">
                                <span class="tip_icon" :style="{background: '#'+shopDetailData.activities[0].icon_color, borderColor:'#'+shopDetailData.activities[0].icon_color}">
                                    {{shopDetailData.activities[0].icon_name}}
                                </span>
                                <span>{{shopDetailData.activities[0].description}}（APP用户专享）</span>
                            </p>
                            <p>{{shopDetailData.activities.length}}个活动</p>
                            <svg class="footer_arrow">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                            </svg>
                        </footer>
                    </router-link>
                </section>
            </header>
            <!--显示活动详情-->
            <transition name="fade">
                <section class="activities_details" v-if="showActivities">
                    <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
                    <h3 class="activities_ratingstar">
                        <rating-star :rating="shopDetailData.rating"></rating-star>
                    </h3>
                    <section class="activities_list">
                        <header class="activities_title_style"><span>优惠信息</span></header>
                        <ul>
                            <li v-for="item in shopDetailData.activities" :key="item.id">
                                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor：'#' +item.icon_color}">
                                    {{item.icon_name}}
                                </span>
                                <span>{{item.description}}（APP用户专享）</span>
                            </li>
                        </ul>
                    </section>
                    <section class="activities_shopinfo">
                        <header class="activities_title_style"><span>商家公告</span></header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close_activities" @click.stop="">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width='1' fill="none" />
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                    </svg>
                </section>
            </transition>

            <!--中间主体内容-->
            <section class="change_show_type" ref="chooseType">
                <div>
                    <span :class="{activity_show:changeShowType == 'food' }" @click="changeShowType ='food'">商品</span>
                </div>
                <div>
                    <span :class="{activity_show:changeShowType == 'rating' }" @click="changeShowType ='rating'">商品</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section class="food_container" v-show="changeShowType == 'food'">
                    <section class="menu_container">
                        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                            <ul>
                                <li v-for="(item, index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category_num" v-if="categoryNum[index] && item.type ==1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu_right" ref="menuFoodList">
                            <ul>
                                <li v-for="(item, index) in menuList" :key="index">
                                    <header class="menu_detail_header">
                                        <section class="menu_detail_header_left">
                                            <strong class="menu_item_title">{{item.name}}</strong>
                                            <span class="menu_item_description">{{item.description}}</span>
                                        </section>
                                        <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                                        <!--title详情-->
                                        <p class="description_tip" v-if="index == TitleDetailIndex">
                                            <span>{{item.name}}</span>
                                            {{item.description}}
                                        </p>
                                    </header>
                                    <section v-for="(foods, foodindex) in item.foods" :key="item.foodindex" class="menu_detail_list">
                                        <router-link :to="{path:'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                                            <section class="menu_food_img">
                                                <img :src="imgBaseUrl + foods.image_path">
                                            </section>
                                            <section class="menu_food_description">
                                                <h3 class="food_description_head">
                                                    <strong class="description_foodname">{{foods.name}}</strong>
                                                    <ul v-if="foods.attributes.length" class="attributes_ul">
                                                        <li :for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color, borderColor:'#' + attribute.icon_color}" :class="{attribute_new:attribute.icon_name == '新'}">

                                                        </li>
                                                    </ul>
                                                </h3>
                                            </section>
                                        </router-link>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import { shopListImgBaseUrl } from '../../config/env'
    import ratingStar from './ratingStar'
    import {getImgPath } from '../../components/common/mixin'
    import { imgBaseUrl } from '../../config/env'

    export default {
        data(){
            return{
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading:true,//显示加载动画
                showActivities:false,//显示活动详情页
                shopListImgBaseUrl,
                shopDetailData:[],//商铺详情
                changeShowType: 'food',//切换显示商品或者评价
                menuList: [], //食品列表
                imgBaseUrl,//baseimgurl
            }
        },
        computed:{
            promotionInfo(){
                return this.shopDetailData.promotion_info || "欢迎光临，用餐高峰期请提前下单，谢谢。";
            }
        },
        mounted(){

        },
        props:[],
        components:{
            ratingStar,
        },
        methods:{
            goback(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

</style>