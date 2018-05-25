<template>
    <div class="confirmOrderContainer">
        <section v-if="!showLoading">
            <headTop head-title="确认订单" goBack="true" signin-up='confirmOrder'></headTop>
            <router-link :to="{path:'/confirmOrder/chooseAddress'} ">
                <div class="address_empty_left">
                    <svg class="location_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#loaction"></use>
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
            <section class="delivery_model contianer_style">
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
                <header v-if="checkData.cart.restaurant_info">
                    <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                    <span>{{checkoutData.cart.restaurant_info.name}}</span>
                </header>
                <ul class="food_list_ul" v-if="checkoutData.cart.groups">
                    <li v-for="item in checkoutData.cart.groups[0]" :key="item.id" class="food_item_style">
                        <p class="food_name ellipsis">{{item.name}}</p>
                        <div class="num_price">
                            <span>¥{{item.quantity}}</span>
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
            <section class="pay_way container-style">
                <router-link :to="{path:'/confirmOrder/remark'}">
                    <span>订单备注</span>
                    <div class="more_type">
                        <span class="ellipsis">{{remarkText || inputText ? remarklist: '口味、偏好等'}}</span>
                        <svg class="address_empty_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href='#arrwo-right'></use>
                        </svg>
                    </div>
                </router-link>
                <router-link :to="checkoutData.invoice.is_availabel? '/confirmOrder/invoice' : '' ">
                    <span>发票抬头</span>
                    <span>
                        {{checkoutData.invoice.status_text}}
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
                            <svg class="address_empty_right" @click="">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            </transition>
        </section>
        <loading v-if="showLoading"></loading>
        <alert-tip v-if="showAlert" @closeTip="showAler = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations } from 'vuex'
    import headTop from '../../components/header/header.vue'
    import loading from '../../components/common/loading.vue'
    import alerttip from '../../components/common/alertTip.vue'
    import { shopListImgBaseUrl } from '../../config/env'

    export default {
        data(){
            return{
                geohash:'',//geohash位置信息
                shopId:null,//商店id值
                imgBaseUrl: shopListImgBaseUrl,
                showLoading: false,//显示加载动画
                checkoutData:null,//检验购物车后后台放回值
                shopCart:null,//购物车
            }
        },
        created(){
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.shopId;
            this.INIT_BUYCART();
            this.shopCart = this.cartList[this.shopId];
        },
        mounted(){

        },
        components: {
            headTop,
            loading,
            alerttip
        },
        computed: {
            ...mapState([
                'carList','choosedAddress'
            ])
        },
        methods : {
            ...mapMutations([
                'INIT_BUYCART',
            ]),
            async initData(){

            }
        }
    }
</script>

<style>

</style>