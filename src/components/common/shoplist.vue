<template>
    <div class="shoplist_container">
        <ul v-load-more="loadMore" v-if="shopListArr.length" type="1">
            <router-link :to="{path:'shop', query:{geohash, id:item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
                <section>
                    <img :src="shopListImgBaseUrl+ item.image_path" class="shop_img">
                </section>
                <section class="shop_right">
                    <header class="shop_detail_header">
                        <h4 :class="item.is_premium? 'premium': '' " class="shop_title ellipsis">{{item.name}}</h4>
                        <!--商家保障-->
                        <ul class="shop_detail_ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="rating_order_num">
                        <section class="rating_order_num_left">
                            <!--满意度星星-->
                            <section class="rating_section">
                                <rating-star :rating="item.rating"></rating-star>
                                <span class="rating_num">{{item.rating}}</span>
                            </section>
                            <section class="order_section">
                                月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating_order_num_right">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
                            ¥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation">/</span>
                            {{item.piecewise_agent_fee}}
                        </p>
                        <p class="distance_time">
                            <span v-if="item.distance">{{item.distance}}
                                <span class="segmentation">/</span>
                            </span>
                            <span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </h5>
                </section>
            </router-link>
        </ul>
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../images/shop_back_svg.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">没有更多了</p>
        <aside class="return_top" @click="" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xink="http://www.w3.org/1999/xlink" xink:href="#backtop"></use>
            </svg>
        </aside>
        <div ref="abc" style="background-color: red"></div>
        <!--将动画效果挂到loading组件-->
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {shopListImgBaseUrl} from "../../config/env"
    import { fetchShopList } from "../../service/fetchData"
    import ratingStar from './ratingStar'
    import loading from './loading'
    import { loadMore } from './mixin'
    export default {
        data(){
            return{
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                shopListArr:[], // 店铺列表数据
                shopListImgBaseUrl,
                preventRepeatReuqest: false,//到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: true, //显示加载动画
                touchend: false, //没有更多数据

            }

        },
        mounted(){
            this.initData();
        },
        components:{
            ratingStar,
            loading
        },
        props:['geohash', 'restaurantCategoryId'],
        mixins:[loadMore],
        computed:{
            //从vuex取经纬度
            ...mapState([
                 'latitude','longitude'

             ]),
        },
        methods : {
            async initData(){
                //获取商铺数据
                let res = await fetchShopList(this.latitude, this.longitude, this.offset,this.restaurantCategoryId);
                this.shopListArr = [...res];
                if(this.shopListArr.length<20){
                    //每次请求都是20条，小于20说明没数据
                    this.touchend = true;
                }
            },
            //到达底部加载更多
            async loaderMore(){

            },
            zhunshi(){

            }

        },
        watch : {

        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin.scss";
    .shoplist_container{
        background: $fc;
        .shop_li{
            display: flex;
            align-items: flex-start;
            padding: 1.5rem 0.5rem;
            .shop_img{
                width: 2.7rem;
                height: 2.7rem;
            }
            .shop_right{
                flex: auto;
                margin-left: 0.5rem;
                .shop_detail_header{
                    display: flex;
                    .premium:before{
                        content: '品牌';
                        margin-right: 0.2rem;
                        padding: 0 0.1rem;
                        border-radius: 0.1rem;
                        background-color: #ffd930;
                        font-size: 0.5rem;
                    }
                    .shop_title{
                        @include sc(0.65rem,#333);
                        align-self: flex-start;
                        width: 9.5rem;
                        font-weight: 700;
                    }
                    .shop_detail_ul{
                        display: flex;
                        align-self: flex-end;
                        justify-content: flex-end;
                        .supports{
                            @include sc(0.4rem, $fzGrey);
                            padding: 0.01rem;
                            border: 1px solid $bc;
                            border-radius: 0.1rem;
                            margin-right: 0.1rem;
                        }
                    }
                }
                .rating_order_num{
                    display: flex;
                }
            }
        }

    }
</style>