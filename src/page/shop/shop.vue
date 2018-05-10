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
                    </router-link>
                    <footer class="description_footer" v-if="shopDetailData.activities.length >0">
                        <p class="ellipsis">
                                <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color } ">
                                    {{shopDetailData.activities[0].icon_name}}
                                </span>
                            <span>{{shopDetailData.activities[0].description}}（APP用户专享）</span>
                        </p>
                        <p>{{shopDetailData.activities.length}}个活动</p>
                        <svg class="footer_arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>
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
                                <span class="activities_icon" :style="{ backgroundColor: '#' + item.icon_color, borderColor:'#' + item.icon_color}">
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
                    <span :class="{activity_show:changeShowType == 'rating' }" @click="changeShowType ='rating'">评价</span>
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
                                    <section v-for="(foodsitem, foodindex) in item.foods" :key="item.foodindex" class="menu_detail_list">
                                        <router-link :to="{path:'shop/foodDetail', query:{image_path:foodsitem.image_path, description: foodsitem.description, month_sales: foodsitem.month_sales, name: foodsitem.name, rating: foodsitem.rating, rating_count: foodsitem.rating_count, satisfy_rate: foodsitem.satisfy_rate, foodsitem, shopId}}" tag="div" class="menu_detail_link">
                                            <section class="menu_food_img">
                                                <img :src="shopListImgBaseUrl + foodsitem.image_path">
                                            </section>
                                            <section class="menu_food_description">
                                                <h3 class="food_description_head">
                                                    <strong class="description_foodname">{{foodsitem.name}}</strong>
                                                    <ul v-if="foodsitem.attributes && foodsitem.attributes.length" class="attributes_ul">
                                                        <li v-for="(attribute, foodindex) in foodsitem.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color, borderColor:'#' + attribute.icon_color}" :class="{attribute_new:attribute.icon_name == '新'}">
                                                            <p :style="{color: attribute.icon_name == '新'? '#fff': '#' + attribute.icon_color}">{{(attribute.icon_name == '新') ? '新品' : attribute.icon_name}}</p>
                                                        </li>
                                                    </ul>
                                                </h3>
                                                <p class="food_description_content">{{foodsitem.description}}</p>
                                                <p class="food_description_sale_rating">
                                                    <span>月售{{foodsitem.month_sales}}份</span>
                                                    <span>好评率{{foodsitem.satisfy_rate}}%</span>
                                                </p>
                                                <p v-if="foodsitem.activity" class="food_activity">
                                                    <span :style="{color: '#' + foodsitem.activity.image_text_color, borderColor: '#' + foodsitem.activity.icon_color}">{{foodsitem.activity.image_text}}</span>
                                                </p>
                                            </section>
                                        </router-link>
                                        <footer class="menu_detail_footer">
                                            <section class="food_price">
                                                <span>¥</span>
                                                <span>{{foodsitem.specfoods[0].price}}</span>
                                                <span v-if="foodsitem.specifications.length">起</span>
                                            </section>
                                            <buy-cart :shopId='shopId' :foods='foodsitem' @moveIncart="listeninCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>
                                        </footer>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                    <section class="buy_cart_container">
                        <section @click="toggleCarList" class="cart_icon_num">
                            <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice >0, move_in_cart:receiveInCart}" ref="cartContainer">
                                <span v-if="totalNum" class="cart_list_length">
                                    {{tatalNum}}
                                </span>
                                <svg class="cart_icon">
                                    <use xmlns:xinlk="http://www.w3.org/1999/xlink" xinlk:href="#cart-icon"></use>
                                </svg>
                            </div>
                            <div class="cart_num">
                                <div>¥{{totalPrice}}</div>
                                <div>配送费¥{{deliveryFee}}</div>
                            </div>
                        </section>
                        <section class="gotopay" :class="{gotopay_activity:minimumOrderAmount<=0}">
                            <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                            <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else>
                                去结算
                            </router-link>
                        </section>
                    </section>
                    <transition name="toggle-cart">
                        <section class="cart_food_list" v-show="showCartList && cartFoodList.length">
                            <header>
                                <h4>购物车</h4>
                                <div @click="clearCart">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                    </svg>
                                    <span class="clear_cart">清空</span>
                                </div>
                            </header>
                            <section class="cart_food_details" id="cartFood">
                                <ul>
                                   <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                                       <div class="cart_list_num">
                                           <p class="ellipsis">{{item.name}}</p>
                                           <p class="ellipsis">{{item.specs}}</p>
                                       </div>
                                       <div class="cart_list_price">
                                           <span>¥</span>
                                           <span>{{item.price}}</span>
                                       </div>
                                       <section>
                                           <span @click="">
                                               <svg>
                                                   <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                               </svg>
                                           </span>
                                           <span class="cart_num">{{item.num}}</span>
                                           <svg class="cart_add" >
                                               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                           </svg>
                                       </section>
                                   </li>
                                </ul>
                            </section>
                        </section>
                    </transition>
                    <transition name="fade">
                        <div class="screen_cover" v-show="showCartList && cartFoodlist.length" @click=""></div>
                    </transition>
                </section>
            </transition>
            <transition name="fade-choose">
                <section class="rating_container" id="ratingContainer" v-show="changeShowType == 'rating' ">
                    <section v-load-more="loaderMoreRating" type="2">
                        <section>
                            <header class="rating_header">
                                <section class="rating_header_left">
                                    <p>{{shopDetailData.rating}}</p>
                                    <p>综合评价</p>
                                    <p>高于周边商家{{(ratingScoresData.compare_rating*1000).toFixed(1)}}%</p>
                                </section>
                                <section class="rating_header_right">
                                    <p>
                                        <span>服务态度</span>
                                        <rating-star :rating="ratingScoresData.food_score"></rating-star>
                                        <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                                    </p>
                                    <p>
                                        <span>菜品评价</span>
                                        <rating-star :rating="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</rating-star>
                                    </p>
                                    <p>
                                        <span>送达时间</span>
                                        <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                                    </p>
                                </section>
                            </header>
                            <ul class="tag_list_ul">
                                <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex == index}" @click="">{{item.name}}({{item.count}})</li>
                            </ul>
                            <ul class="rating_list_ul">
                                <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
                                    <img :src="getImgPath(item.avatar)" class="user_avatar">
                                    <section class="rating_list_details">
                                        <header>
                                            <section class="username_star">
                                                <p class="username">{{item.username}}</p>
                                                <p class="star_desc">
                                                    <rating-star :rating="item.rating_star"></rating-star>
                                                    <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                                                </p>
                                            </section>
                                            <time class="rated_at">{{item.rated_at}}</time>
                                        </header>
                                        <ul class="food_img_ul">
                                            <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                                                {{item.food_name}}
                                            </li>
                                        </ul>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <section>
            <transition name='fade'>
                <div class="specs_cover" @click="" v-if="showSpecs"></div>
            </transition>
            <transition name="fadeBounce">
                <div class="specs_list" v-if="showSpecs">
                    <header class="specs_list_header">
                        <h4 class="ellipsis">{{choosedFoods.name}}</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="specs_cancel" @click="">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2"/>
                        </svg>
                    </header>
                    <section class="specs_details">
                        <h5 class="specs_details_title">{{chooseFoods.specifications[0].name}}</h5>
                        <ul>
                            <li v-for="(item, index) in choosedFoods.specifications[0].values" :class="{specs_activity: itemIndex == specsIndex}" @click="">
                                {{item}}
                            </li>
                        </ul>
                    </section>
                    <footer class="specs_footer">
                        <div class="specs_price">
                            <span>¥</span>
                            <span>{{choosedFoods.specfodds[specsIndex].price}}</span>
                        </div>
                        <div class="specs_addto_cart" @click="">加入购物车</div>
                    </footer>
                </div>
            </transition>
        </section>
        <transition name="fade">
            <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
        </transition>
        <transition
        appear
        @after-appear = 'afterEnter'
        @before-appear = 'beforeEnter'
        v-for="(item, index) in showMoveDot"
        >
            <span class="move_dot" v-if="item">
                <svg class="move_liner">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </transition>
        <loading v-show="showLoading || loadRatings"></loading>
        <section class="animation_opactiy shop_back_container" v-if="showLoading">
            <img src="../../images/shop_back_svg.svg">
        </section>
        <transition nam="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import { shopListImgBaseUrl } from '../../config/env'
    import ratingStar from '../../components/common/ratingStar'
    import {getImgPath, loadMore} from '../../components/common/mixin'
    import { imgBaseUrl } from '../../config/env'
    import loading from '../../components/common/loading'
    import buyCart from '../../components/common/buyCart.vue'
    import {shopDetails, foodMenu, ratingScores, ratingTags} from '../../service/fetchData'

    export default {
        data(){
            return{
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading:true,//显示加载动画
                showActivities:false,//显示活动详情页
                shopListImgBaseUrl,
                shopDetailData:null,//商铺详情
                changeShowType: 'food',//切换显示商品或者评价
                menuList: null, //食品列表
                imgBaseUrl,//baseimgurl
                showSpecs:false,//控制显示食品规格
                showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
                showMoveDot:[], //控制下落的小圆点显示隐藏
                menuIndex: 0, //已选菜单索引值，默认为0
                categoryNum: [], //商品类型右上角已加入购物车的数量
                TitleDetailIndex: null, //点击展示列表头部详情
                totalPrice: 0, //总共价格
                showCartList: false,//显示购物车列表
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
                cartFoodList: [], //购物车商品列表
                ratingScoresData: null, //评价总体分数

            }
        },
        computed:{
            ...mapState([
                'latitude', 'longitude', 'cartList'
            ]),
            promotionInfo(){
                return this.shopDetailData.promotion_info || "欢迎光临，用餐高峰期请提前下单，谢谢。";
            },
            //购物车总共商品数量
            totalNum(){
                let num = 0;
                this.cartFoodList.forEach(item => {
                    num+= item.num;
                })

                return num;
            },
            //配送费
            deliveryFee(){
                if(this.shopDetailData){
                    return this.shopDetailData.float_delivery_fee;
                }
                return 0;
            },
            //还差多少元起送，为负数时显示去结算按钮
            minimumOrderAmount(){
                if(this.shopDetailData){
                    return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
                }
                return 0;
            },
            //当前购物车信息
            shopCart(){
                return {...this.cartList[this.shopId]};
            }
        },
        created(){
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted(){
            this.initData();
        },
        props:[],
        mixins:[loadMore, getImgPath],
        components:{
            ratingStar,loading,buyCart
        },
        methods:{
            goback(){

            },
            //隐藏动画
            hideLoading(){
                this.showLoading = false;
            },
            async initData(){
                //页面头部详情
                this.shopDetailData = await shopDetails(this.shopId);
                //店铺食物
                this.menuList = await foodMenu(this.shopId);
                //店铺评论分数
                this.ratingScoresData = await ratingScores(this.shopId);
                this.hideLoading();
            },
            async loaderMoreRating(){
            },
            //控制购物车列表是否显示
            toggleCarList(){
                
            },
            //清空购物车
            clearCart(){

            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin.scss";

    .shop_container{
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        .goback{
            position: fixed;
            top:0.2rem;
            left:0.2rem;
            right: 0;
            height: 2rem;
            z-index: 999;
        }
        .shop_detail_header{
            width: 100%;
            .header_cover_img{
                filter: blur(10px);
                position: absolute;
                width: 100%;
                z-index: 9;
            }
            .description_header{
                width: 100%;
                .description_top{
                    display: flex;
                    position: relative;
                    padding: 0.8rem 0.4rem 0.4rem;
                }
                .description_left {
                    z-index: 99;
                    img{
                        width: 2.9rem;
                        height: 2.9rem;
                    }
                }
                .description_right{
                    @include sc(0.04rem,  $fc);
                    z-index: 10;
                    margin-left: 0.5rem;
                    .description_title{
                        font-size: 0.8rem;
                        font-weight: bold;
                        margin-bottom: 0.3rem;
                    }
                    .description_text{
                        margin-bottom: 0.3rem;
                    }
                    .description_promotion{
                        margin-bottom: 0.3rem;
                    }
                }
                .description_arrow{
                    @include ct;
                    right: 0.5rem;
                    z-index: 11;
                }
                .description_footer{
                    display: flex;
                    justify-content: space-between;
                    padding-left: 0.6rem;
                    width: 100%;
                    @include sc(0.04rem,  $fc);
                    p{
                        z-index: 99;
                    }
                    p:first-child{
                        width: 80%;
                        .tip_icon{
                            padding: 0.03rem 0rem 0.03rem 0.15rem;
                            border-radius: 0.1rem;
                        }
                    }
                    .footer_arrow{
                        @include wh(1rem, 0.45rem);
                        z-index: 99;
                    }
                }
            }
        }
        .change_show_type{
            display: flex;
            margin-top: .5rem;
            background: $fc;
            z-index: 99;
            width: 100%;
            padding: .6rem 0 .6rem;
            border-bottom: 1px solid #ebebeb;
            @include sc(0.65rem, #666);
            div{
                flex: 1;
                text-align: center;
                span{
                    border-bottom: 0.12rem solid #fff;
                    padding: .2rem .1rem;
                }
            }
            .activity_show{
                color: $blue;
                border-bottom-color: $blue;
            }
        }
        .food_container{
            display: flex;
            flex-wrap:wrap;
            flex: 1;
            background: #F5F5F5;
            z-index: 99;
            .menu_container{
                flex: 1;
                display: flex;
                .menu_left{
                    flex-direction:column;
                    .menu_left_li{
                        display: flex;
                        @include sc(0.6rem, #333);
                        padding: 1rem 0.2rem;
                        width: 3.8rem;
                        img{
                            width: 0.5rem;
                            height: 0.5rem;
                            padding-right: 0.2rem;
                        }
                        span:nth-of-type(1){
                            font-weight: bold;
                            vertical-align: middle;
                            line-height: 0.5rem;
                        }

                    }
                    .activity_menu{
                        border-left: 0.15rem solid $blue;
                        background: $fc;
                    }
                }
                .menu_right{
                    flex-direction:row-reverse;
                    flex: 1;
                    .menu_detail_header{
                        display: flex;
                        padding: 0.6rem .5rem;
                        justify-content:space-between;
                        .menu_detail_header_left{
                            .menu_item_title{
                                @include sc(0.8rem, #333);
                            }
                            .menu_item_description{
                                @include sc(0.4rem, $fzGrey);
                            }
                        }
                        .menu_detail_header_right{
                            display: block;
                            @include wh(.5rem, 1.4rem);
                            @include bis('../../images/icon_point.png');
                            background-size: 100% .4rem;
                            background-position: left center;
                        }
                    }
                    .menu_detail_list{
                        position: relative;
                        background: $fc;
                        padding: 0.6rem .4rem;
                        border-bottom: 1px solid $bc;
                        overflow: hidden;
                        .menu_detail_link{
                            display: flex;
                            .menu_food_img img{
                                @include wh(2.5rem, 2.5rem);
                                margin-right: 0.5rem;
                            }
                            .menu_food_description{
                                flex:1;
                            }
                            .food_description_head{
                                display: flex;
                                justify-content: space-between;
                                .description_foodname{
                                    font-size: 0.7rem;
                                    margin-bottom: 0.2rem;
                                }
                                .attributes_ul{
                                    display: flex;
                                    li{
                                        font-size: .3rem;
                                        border: 1px solid #ccc;
                                        padding: 0.1rem;
                                        line-height: 0.35rem;
                                        height: 0.6rem;
                                        border-radius: .2rem;
                                    }
                                    .attribute_new {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 2rem;
                                        height: 2rem;
                                        border-radius: 0;
                                        background-color: #4cd964;
                                        transform: rotate(-45deg) translate(-0.1rem, -1.4rem);
                                        font-size: 0.4rem;
                                        text-align: center;
                                        P{
                                            line-height: 3.1rem;
                                        }
                                    }
                                }
                            }
                            .food_description_content{
                                @include sc(0.5rem, $fzGrey);
                                margin-bottom: .2rem;
                            }
                            .food_description_sale_rating{
                                font-size: 0.5rem;
                            }
                            .food_activity{
                                line-height: 0.4rem;
                               span{
                                   display: inline-block;
                                   border: 1px solid $bc;
                                   font-size: 0.3rem;
                                   border-radius: 0.3rem;
                                   padding: 0.08rem;
                                   transform: scale(0.8);
                               }
                            }
                        }
                        .menu_detail_footer{
                            padding-left: 3rem;
                            display: flex;
                            justify-content: space-between;
                            .food_price{
                                color: #f60;
                                font-size: 0.65rem;
                            }
                        }
                    }
                }
            }
            .buy_cart_container{
                display: flex;
            }
        }
    }
</style>