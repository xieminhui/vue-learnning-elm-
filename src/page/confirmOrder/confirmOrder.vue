<template>
    <div class="confirmOrderContainer">
        <section v-if="!showLoading">
            <headTop head-title="确认订单" goBack="true" signin-up='confirmOrder'></headTop>
            <router-link :to="{path:'/confirmOrder/chooseAddress'} " class="address_container">
                <div class="address_empty_left">
                    <svg class="location_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
                    </svg>
                    <div class="add_address" v-if="!choosedAddress">请添加一个地址</div>
                    <div v-else class="address_detail_container">
                        <header>
                            <span>{{choosedAddress.name}}</span>
                            <span>{{choosedAddress.sex == 1?'先生':'女士'}}</span>
                            <span>{{chhoosedAddress.phone}}</span>
                        </header>
                        <div class="address_detail">
                            <span v-if="choosedAddress.tag" :style="">{{choosedAddress.tag}}</span>
                            <p>{{choosedAddress.address_detail}}</p>
                        </div>
                    </div>
                </div>
                <svg class="address_empty_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </router-link>
            <section class="delivery_model container_style">
                <p class="deliver_text">送达时间</p>
                <section class="deliver_time">
                    <p>尽快送达 | 预计 {{checkoutData.delivery_reach_time}}</p>
                    <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
                </section>
            </section>
            <section class="pay_way container_style">
                <header class="header_style">
                    <span>支付方式</span>
                    <div class="more_type" @click="showPayWayFun">
                        <span>在线支付</span>
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </div>
                </header>
                <section class="hongbao">
                    <span>红包</span>
                    <span>暂时只在饿了么 app 中支持</span>
                </section>
            </section>
            <section class="food_list">
                <header v-if="checkoutData.cart.restaurant_info">
                    <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                    <span>{{checkoutData.cart.restaurant_info.name}}</span>
                </header>
                <ul class="food_list_ul" v-if="checkoutData.cart.groups">
                    <li v-for="item in checkoutData.cart.groups[0]" :key="item.id" class="food_item_style">
                        <p class="food_name ellipsis">{{item.name}}</p>
                        <div class="num_price">
                            <span>x {{item.quantity}}</span>
                            <span>¥{{item.price}}</span>
                        </div>
                    </li>
                </ul>
                <div class="food_item_style" v-if="checkoutData.cart.extra">
                    <p class="food_name ellipsis">{{checkoutData.cart.extra[0].name}}</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥{{checkoutData.cart.extra[0].price}}</span>
                    </div>
                </div>
                <div class="food_item_style">
                    <p class="food_name ellipsis">配送费</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥{{checkoutData.cart.deliver_amount || 0}}</span>
                    </div>
                </div>
                <div class="food_item_style total_price">
                    <p class="food_nam ellipsis">订单 ¥{{checkoutData.cart.total }}</p>
                    <div class="num_price">
                        <span>待支付 ¥{{checkoutData.cart.total}}</span>
                    </div>
                </div>
            </section>
            <section class="pay_way container_style">
                <router-link :to="{path:'/confirmOrder/remark'}" class="header_style">
                    <span>订单备注</span>
                    <div class="more_type">
                        <span class="ellipsis">{{remarkText || inputText ? remarklist: '口味、偏好等'}}</span>
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href='#arrow-right'></use>
                        </svg>
                    </div>
                </router-link>
                <router-link :to="checkoutData.invoice.is_availabel? '/confirmOrder/invoice' : '' " class="hongbao" :class="{support_is_available: checkoutData.invoice.is_available}">
                    <span>发票抬头</span>
                    <span>
                        {{checkoutData.invoice.status_text}}
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>

                </router-link>
            </section>
            <section class="confirm_order">
                <p>待支付 ¥{{checkoutData.cart.total}}</p>
                <p @click="confirmOrder">确认下单</p>
            </section>
            <transition name="fade">
                <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
            </transition>
            <transition name="slid_up">
                <div class="choose_type_Container" v-if="showPayWay">
                    <header>支付方式</header>
                    <ul>
                        <li v-for="item in checkoutData.payments" :key="item.id" :class="{choose: payWayId == item.id}">
                            <span>{{item.name}}</span>
                            <span v-if="item.is_online_payment">{{item.description}}</span>
                            <svg class="address_empty_right" >
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            </transition>
        </section>
        <loading v-if="showLoading"></loading>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations } from 'vuex'
    import headTop from '../../components/header/header.vue'
    import loading from '../../components/common/loading.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { shopListImgBaseUrl } from '../../config/env'
    import { checkOut } from '../../service/fetchData'

    export default {
        data(){
            return{
                geohash:'',//geohash位置信息
                shopId:null,//商店id值
                imgBaseUrl: shopListImgBaseUrl,
                showLoading: false,//显示加载动画
                checkoutData:null,//检验购物车后后台放回值
                shopCart:null,//购物车
                showAlert:true,//提示框
                alertText:'请先登录',
                showPayWay:false,//显示付款方式

            }
        },
        created(){
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.shopId;
            this.INIT_BUYCART();
            this.shopCart = this.cartList[this.shopId];
        },
        mounted(){
            this.initData();
        },
        components: {
            headTop,
            loading,
            alertTip
        },
        computed: {
            ...mapState([
                'cartList','choosedAddress','remarkText','inputText',
            ])
        },
        methods : {
            ...mapMutations([
                'INIT_BUYCART',
            ]),
            async initData(){
                let newArr = new Array;
                Object.values(this.shopCart).forEach(categoryItem => {
                    Object.values(categoryItem).forEach(itemValue => {
                        Object.values(itemValue).forEach(foodItem => {
                            newArr.push({
                                attrs: [],
                                extra: {},
                                id: foodItem.id,
                                name: foodItem.name,
                                packing_fee: foodItem.packing_fee,
                                price: foodItem.price,
                                quantity: foodItem.num,
                                sku_id: foodItem.sku_id,
                                specs: [foodItem.specs],
                                skock: foodItem.stock,
                            })
                        })
                    })
                })
                this.checkoutData = await checkOut(this.geohash, [newArr], this.shopId);
            },
            //显示付款方式
            showPayWayFun(){

            },
            //确认订单
            async confirmOrder(){

            }
        }
    }
</script>

<style type="text/scss" scoped lang="scss">
    @import "../../style/mixin";
    .confirmOrderContainer{
        padding: 2rem 0 2.6rem;
        .address_container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0.6rem;
            margin-bottom: 0.4rem;
            background:$fc url("../../images/address_bottom.png") left bottom repeat-x;
            .address_empty_left{
                display: flex;
                align-items: center;
                .location_icon{
                    @include wh(.8rem, .8rem);
                    fill: $blue;
                    margin-right: 0.2rem;
                }
                .add_address{
                    @include sc(0.8rem, #333);
                }
            }
            .address_empty_right{
                @include wh(0.6rem, .6rem);
                fill: $fzGrey;
            }
        }
        .container_style{
            background: $fc;
            padding: 0.4rem .7rem;
            margin-bottom: .4rem;
        }
        .delivery_model{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: .2rem solid $blue;
            min-height: 4rem;
            .deliver_text{
                font-size: 0.8rem;
                font-weight: bolder;
            }
            .deliver_time{
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                @include sc(0.7rem, $blue);
                p:nth-of-type(2){
                    margin-top: .6rem;
                    padding: 0.1rem;
                    border-radius: 0.12rem;
                    font-size: .5rem;
                    width: 2.4rem;
                    background: $blue;
                    color: $fc;
                    text-align: center;
                }
            }
        }
        .pay_way{
            .header_style{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .4rem;
                font-size: 0.7rem;
                border-bottom:0.01rem solid #F5F5F5;
                color: #aaa;
                span:nth-of-type(1){
                    color: #666;
                }
                .more_type{
                    span{
                        color: #aaa;
                    }
                    .address_empty_right{
                        @include wh(0.6rem, .6rem);
                        fill: #aaa;
                    }
                }
            }
            .hongbao{
                display: flex;
                justify-content:space-between;
                padding: .8rem .4rem .4rem;
                span{
                    @include sc(0.65rem, $fzGrey);
                }
                .address_empty_right{
                    @include wh(0.6rem, .6rem);
                    fill: $fzGrey;
                }
            }
            .support_is_available{
                span:nth-of-type(1){
                    color: #666;
                }
            }
        }
        .food_list{
            padding: 0 0.8rem;
            background: $fc;
            margin-bottom: .4rem;
            header{
                display: flex;
                align-items: center;
                padding: 0.8rem 0;
                border-bottom:0.01rem solid #F5F5F5;
                img{
                    @include wh(1.5rem, 1.5rem);
                    margin-right: 0.4rem;
                }
                span{
                    font-size: 0.8rem;
                }
            }
            .food_item_style{
                display: flex;
                flex:1;
                justify-content:space-between;
                @include sc(0.65rem, #666);
                padding: .4rem 0;
                p{
                    width: 70%;
                }
                .num_price{
                    display: flex;
                    justify-content:space-between;
                    align-items: flex-end;
                    flex: 1;
                    span:nth-of-type(1){
                        color: #f60;
                    }
                }
            }
            .food_list_ul{
                padding: 0.4rem 0 0;
            }
            .total_price{
                border-top:0.01rem solid #f5f5f5;
                line-height: 1.8rem;
            }
        }
        .confirm_order{
            display: flex;
            position: fixed;
            bottom: 0;
            left:0;
            right:0;
            margin-top: 0.8rem;
            color: $fc;
            font-size: .8rem;
            height: 2rem;
            p{
                padding: .4rem .8rem;
            }
            p:nth-of-type(1){
                background-color: #3c3c3c;
                flex: 2;
            }
            p:nth-of-type(2){
                background-color: #56d176;
            }
        }
    }
</style>