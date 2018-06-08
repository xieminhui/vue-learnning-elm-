<template>
    <div class="profile_page">
        <head-top go-back="true" :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo && userInfo.user_id ? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo && userInfo.user_id">
                    <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p>{{username}}</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{count}}</b>元</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{pointNumber}}</b>元</span>
                        <span class="info-data-bottom">我的积分</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!--我的订单-->
                <router-link to="/order" class="myorder">
                    <aside>
                        <svg fill="@4aa5fo">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!--积分商城-->
                <a href="https://home.m.duiba.com.cn/#/chome/index">
                    <aside>
                        <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlnk" xlink:href="#point"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>积分商城</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </a>
                <!--饿了么会员卡-->
                <router-link to="/vipcard" class="myorder">
                    <aside>
                        <svg fill="@ffc636">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>饿了么会员卡</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!--服务中心-->
                <router-link to="/service" class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!--下载饿了么app-->
                <router-link to="/download" class="myorder">
                    <aside>
                        <svg fill="#3cabff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div" style="margin-bottom: 0">
                        <span>下载饿了么APP</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-link></router-link>
        </transition>
    </div>
</template>
<script>
    import headTop from '../../components/header/header.vue'
    import footGuide from '../../components/footer/footGuide.vue'
    import { mapState }from 'vuex'
    import {shopListImgBaseUrl} from '../../config/env'
    export default {
        data(){
            return{
                profiletitle : '我的',
                username: '登录/注册',
                imgBaseUrl : shopListImgBaseUrl,
                resetname: '',
                mobile: '暂无绑定手机号',             //电话号码
                balance: 0,            //我的余额
                count : 0,             //优惠券个数
                pointNumber : 0,       //积分数
                avatar: '',
            }
        },
        mounted(){
            this.initData();
        },
        created(){

        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        components:{
            headTop,
            footGuide
        },
        methods: {
            initData(){
                if(this.userInfo &&  this.userInfo.user_id){
                    this.avatar = this.userInfo.avatar;
                    this.username = this.userInfo.username;
                    this.mobile = this.userInfo.mobile;
                    this.balance = this.userInfo.balance;
                    this.count= this.userInfo.gift_amount;
                    this.pointNumber = this.userInfo.point;

                }
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin";
    .profile_page{
        padding-top: 1.95rem;
        .profile-number{
            display: flex;
            background-color: $blue;
            padding: .6rem;
            .profile-link{
                display: flex;
                justify-content: space-between;
            }
            .privateImage{
                @include wh(2.5rem, 2.5rem);
                margin-right: .5rem;
                border-radius: 50%;
                .privateImage-svg{
                    @include wh(2.5rem, 2.5rem);
                }
            }

            .user-info{
                display: flex;
                flex-direction: column;
                justify-content: center;
                p{
                    @include sc(0.65rem ,#fff);
                    font-weight: bolder;
                    margin-bottom: .2rem;
                }
                .user-icon{
                    height: 0.7rem;
                    line-height: .7rem;
                    vertical-align: middle;
                    .icon-mobile{
                        @include wh(.6rem, .8rem);
                    }
                }
                .icon-mobile-number{
                    font-size: 0.5rem;
                    line-height: .8rem;
                    vertical-align: top;
                }
            }
            .arrow{
                position: absolute;
                right: 0;
                padding: .5rem;
                .arrow-svg{
                    @include wh(0.8rem, .8rem);
                }
            }
        }
        .info-data{
            margin-bottom: .2rem;
        }
    }
</style>