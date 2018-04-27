<template>
    <div class="shoplist_container">
        <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
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
                            {{item.piecewise_agent_fee.tips}}
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
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
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
    import { showBack, animate } from '../../config/myUtils'
    export default {
        data(){
            return{
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                shopListArr:[], // 店铺列表数据
                shopListImgBaseUrl,
                preventRepeatRequest: false,//到达底部加载数据，防止重复加载
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
                this.hideLoading();
                //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                let that = this;
                showBack(status => {
                    that.showBackStatus = status;
                })
            },
            //到达底部加载更多
            async loaderMore(){
                if(this.touchend)return;
                //因为异步请求的关系，先等请求数据回来再允许下一次请求，防止重复请求
                if(this.preventRepeatRequest)return;
                this.showLoading = true;
                this.preventRepeatRequest =true;

                //跳过之前请求的数据，类似分页
                this.offset +=20;
                let res = await fetchShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
                this.shopListArr = [...this.shopListArr, ...res];
                this.showLoading = false;
                //当数据小于20，表示没有数据了
                if(res.length < 20){
                    this.touchend = true;
                    return;
                }
                this.preventRepeatRequest = false;
            },
            //开发环境与编译环境loading隐藏方式不同
            hideLoading(){
                this.showLoading = false;
            },
            zhunshi(item){
                let zhunStatus;
                if(item instanceof Array){
                    item.forEach((value) => {
                        if(value.icon_name === '准'){
                            zhunStatus =  true;
                        }
                    })
                }else {
                    zhunStatus = false;
                }
                return zhunStatus;
            },
            backTop(){
                //会触发showBack 的touchend
                animate(document.documentElement, {scrollTop: '0'}, 400,'ease-out');
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
            border-bottom: 1px solid $bc;
            padding: 1rem 0.5rem;
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
                        .supports{
                            @include sc(0.04rem, $fzGrey);
                            padding: 0.01rem;
                            border: 1px solid $bc;
                            border-radius: 0.1rem;
                            margin-right: 0.1rem;
                        }
                    }
                }
                .rating_order_num{
                    display: flex;
                    margin-top: 0.52rem;
                    justify-content: space-between;
                    .rating_order_num_left{
                        display: flex;
                        .rating_section{
                            display: flex;
                            align-items: stretch;
                            .rating_num{
                                @include sc(0.04rem, #ff6000);
                                padding: 0 0.2rem;
                                line-height: 0.8rem;
                            }
                        }
                        .order_section{
                            @include sc(0.04rem, #333);
                            line-height: 0.8rem;
                        }
                    }
                    .rating_order_num_right{
                        display: flex;
                        align-items: center;
                        min-width: 5rem;
                        transform: scale(.7);
                        margin-right: -0.8rem;
                        justify-content: flex-end;
                        .delivery_style{
                            font-size: 0.4rem;
                            border: 0.025rem solid #3190e8;
                            padding: 0.04rem 0.08rem;
                            border-radius: 0.08rem;
                            margin-right: 0.02rem;
                        }
                        .delivery_left{
                            background: #3190e8;
                            color: $fc;
                        }
                        .delivery_right{
                            color: #3190e8;
                        }
                    }
                }
                .fee_distance{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.4rem;
                    @include sc(0.5rem, #666);
                    .distance_time{
                        color: #999;
                        .order_time{
                            color: #3190e8;
                        }
                    }
                }
            }
        }
        .empty_data{
            @include sc(0.5rem, #666);
            text-align: center;
            line-height: 2rem;
        }
        .return_top{
            position: fixed;
            bottom: 3rem;
            right: 1rem;
            .back_top_svg{
                @include wh(2rem, 2rem);
            }
        }
    }
</style>