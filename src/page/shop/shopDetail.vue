<template>
    <div class="rating_page">
        <headtop head-title="商家详情" go-back="true"></headtop>
        <section class="activities_container">
            <header>活动与属性</header>
            <ul class="actibities_ul">
                <li v-for="item in shopDetail.activities" :key="item.id">
                    <span :style='{background: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
            <ul class="actibities_ul">
                <li v-for="item in shopDetail.supports" :key="item.id">
                    <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
        </section>
        <section class="shop_status_container">
            <router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
                <span class="shop_detail_title">食品监督安全公示</span>
                <div>
                    <span class="identification_detail">企业认证详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                        <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
                    </svg>
                </div>
            </router-link>
            <section class="shop_statu_detail">
                <div>
                    <svg class="shop_status" v-if="shopDetail.status == 1">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
                    </svg>
                    <svg v-else>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
                    </svg>
                </div>
                <div class="check_date">
                    <p>
                        <span>监督检查结果：</span>
                        <span class="shop_status_well" v-if="shopDetail.status ==1">良好</span>
                        <span class="shop_status_bad" v-else>差</span>
                    </p>
                    <p>
                        <span>检查日期：</span>
                        <span>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
                    </p>
                </div>
            </section>
        </section>
        <section class="shop_status_info">
            <header>商家信息</header>
            <p>{{shopDetail.name}}</p>
            <p>地址：{{shopDetail.address}}</p>
            <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
            <p @click="showLicenseImg(shopDetail.license.business_license_image)">
                <span>营业执照</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="descrition_arrow">
                    <path d="M0 0 L8 7 L 0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
                </svg>
            </p>
            <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)">
                <span>餐饮服务许可证</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="descrition_arrow">
                    <path d="M0 0 L8 7 L 0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
                </svg>
            </p>
        </section>
        <transition name="fade">
            <section class="license_container" v-if="showlicenseImg" @click="showlicenseImg = false">
                <img :src="imgBaseUrl + licenseImg">
            </section>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headtop from '../../components/header/header'
    import { mapState } from 'vuex'
    import {shopListImgBaseUrl} from '../../../src/config/env'
    export default {
        data(){
            return{
                licenseImg:null,
                showlicenseImg:false,
                imgBaseUrl: shopListImgBaseUrl
            }
        },
        mounted(){

        },
        computed:{
            ...mapState([
                'shopDetail'
            ])
        },
        components:{
            headtop
        },
        mixins:[],
        methods:{
            showLicenseImg(img){
                this.licenseImg = img;
                this.showlicenseImg = true;
            }
        }
    }
</script>

<style lang='scss' type="text/scss" scoped>
    @import "../../style/mixin";
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        background-color: #ebebeb;
        z-index: 18;
        .activities_container{
            margin: 0.4rem 0;
            background: $fc;
            padding-bottom:.6rem;
            @include sc(0.5rem, #666);
            header{
                margin-bottom: .3rem;
                padding: 0.4rem 0.6rem;
                border-bottom: 1px solid $bc;
                @include sc(0.75rem, #333);
            }
            .actibities_ul{
                padding: 0 0.6rem;
                li{
                    margin: .6rem 0;
                    span{
                        line-height: 1rem;
                    }
                    span:nth-of-type(1){
                        color: $fc;
                        padding: 0.1rem 0.1rem;
                        border-radius: 0.1rem;
                        margin-right: 0.3rem;
                    }
                }
            }
        }
        .shop_status_container{
            background: $fc;
            padding: 0 0.6rem;
            margin-bottom: 0.4rem;
            .shop_status_header{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid $bc;
                .shop_detail_title{
                    @include sc(0.75rem, #333);
                    padding: .4rem 0;
                }
                div{
                    .identification_detail{
                        @include sc(0.7rem, $fzGrey);
                    }
                }
            }
            .shop_statu_detail{
                padding: 0.6rem 0;
                display: flex;
                svg{
                    @include wh(2rem, 2rem);
                    margin-right: .6rem;
                }
                .check_date{
                    p{
                        margin-bottom: .4rem;
                        @include sc(0.4rem, #666);
                    }
                    .shop_status_well{
                        color: #7ed321;
                    }
                }
            }
        }
        .shop_status_info{
            background: $fc;
            header{
                padding: 0.4rem 0.6rem;
                @include sc(0.8rem, #333);
                border-bottom: 1px solid $bc;
            }
            p{
                margin-left: 0.6rem;
                padding: 0.6rem 0;
                border-bottom: 1px solid $bc;
                @include sc(0.65rem, #666);
            }
            p:nth-of-type(4),p:nth-of-type(5){
                display: flex;
                justify-content: space-between;
                svg{
                    margin-right: 0.5rem;
                }
            }

        }
        .license_container{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.5);
            z-index: 10001;
            img{
                width: 100%;
                @include center;
            }
        }
        .fade-enter-active,.fade-leave-actvie{
            transition: opacity .5s;
        }
        .fade-enter,.fade-leave-to{
            opacity: 0;
        }
        .router-slid-enter-active, .router-slid-leave-active {
            transition: all .4s;
        }
        .router-slid-enter, .router-slid-leave-to {
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }
    }
</style>