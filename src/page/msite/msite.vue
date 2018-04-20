<template>
    <div>
        <head-top signin-up='msite' :head-title="cityName" v-on:goto="gotoHome">
            <router-link :to="'/search/' + geohash" class="search_svg" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke: rgb(255,255,255); stroke-width: 2" />
                </svg>
            </router-link>
        </head-top>
        <!--swiper-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide  food_types_container" v-for="(item, index) in foodTypes" :key="index">
                        <router-link class="food_link":to="{path: '/food'}" v-for="(value, key) in item" :key="value.id">
                            <figure>
                                <img :src="imgBaseUrl + value.image_url">
                                <figcaption>{{value.title}}</figcaption>
                            </figure>
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
        </nav>
        <div class="shop_list_container">
            <header class="shop_header">
                <svg class="shop_icon">
                    <use xmlns:xlink="http://www.w3.org/2001/xlink" xlink:href="#shop"></use>
                </svg>
                <span class="shop_header_title">附近商家</span>
            </header>
            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import 'src/plugins/swiper.min.js'
    import 'src/style/swiper.min.css'
    import headTop from '../../components/header/header'
    import shopList from '../../components/common/shoplist'
    import { guessCity, fetchCityinfoBygeohash, fetchFoodType} from '../../service/fetchData'
    import {imgBaseUrl} from "../../config/env"
    export default {
        data(){
            return{
                geohash:'',//url参
                cityName:'',//城市名字
                foodTypes:[],//订餐分类
                imgBaseUrl: imgBaseUrl,
                hasGetData:false,//是否拿到shoplist数据
            }
        },
        computed:{

        },
        async beforeMount(){
            let res;
            if(!this.$route.query.geohash){
                res = await guessCity();//await会等到返回在往下跑
                this.geohash = res.latitude + ',' + res.longitude;
                this.cityName = res.cityName;
            }else{
                this.geohash = this.$route.query.geohash;
                res = await fetchCityinfoBygeohash(this.geohash);
                this.cityName = res.name;
            }
            this.SAVE_GEOHASH(this.geohash);
            this.SAVE_LATANDLON(res);
            this.hasGetData = true;
        },
        mounted(){
            fetchFoodType().then(res =>{
                let reslength  = res.length;
                let resArr = [...res];
                let foodArr = [];
                for(let i=0,j=0;i<reslength;i+=8,j++){
                    foodArr[j] = res.splice(0, 8);
                }
                this.foodTypes = foodArr;
            }).then(() =>{
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    loop:true
                })
            })
        },
        components:{
            headTop,
            shopList
        },
        methods:{
            gotoHome(){
                this.$router.push({ path: '/home' })
            },
            ...mapMutations(['SAVE_GEOHASH', 'SAVE_LATANDLON']),
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin";

    .search_svg{
        @include ct;
        @include wh(0.9rem, 0.9rem);
        left:0.8rem;
    }
    .msite_nav{
        padding-top: 2.1rem;
        background: $fc;
        height: 10.6rem;
        border-bottom: 0.025rem solid $bc;
        .swiper-container{
            @include wh(100%, auto);
            padding-bottom: 0.6rem;
            .food_types_container{
                display: flex;
                flex-wrap: wrap;
                .food_link{
                    @include wh(25%, auto);
                    padding: 0.3rem 0rem;
                    figure{
                        text-align: center;
                        img{
                            @include wh(1.8rem, 1.8rem);
                            margin-bottom: 0.3rem;
                        }
                        figcaption{
                            @include sc(0.55rem, #666);
                        }
                    }
                }
            }

        }
        .swiper-pagination{
            bottom: 0.2rem;
        }
    }
    .shop_list_container{
        margin-top: 0.4rem;
        border-top: 0.025rem solid $bc;
        background: $fc;
        .shop_header{
            .shop_icon{
                @include wh(0.6rem, 0.6rem);
                fill:#999;
                padding: 0.4rem 0rem 0.4rem 0.4rem;
                vertical-align: middle;
            }
            .shop_header_title{
                @include sc(0.55rem, #999)
            }
        }
    }
</style>