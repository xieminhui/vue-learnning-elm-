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
                    </router-link>
                </section>
            </header>
        </section>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import { shopListImgBaseUrl } from '../../config/env'
    export default {
        data(){
            return{
                showLoading:true,//显示加载动画
                showActivities:false,//显示活动详情页
                shopListImgBaseUrl,
                shopDetailData:'',//商铺详情
            }
        },
        computed:{
            promotionInfo(){
                return ;
            }
        }
        mounted(){

        },
        props:[],
        methods:{
            goback(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin.scss";

</style>