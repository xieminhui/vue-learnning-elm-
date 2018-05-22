<template>
    <div class="rating_page">
        <head-top :head-title="name" go-back="true"></head-top>
        <section class="header_img">
            <img :src="imgBaseUrl + image_path" class="food_img">
            <div class="cover"></div>
        </section>
        <p class="description">{{description}}</p>
        <section class="detail_container">
            <section class="detail_left">
                <p>{{name}}</p>
                <div class="rating_sale">
                    <span>评分</span>
                    <ratingstar :rating="rating"></ratingstar>
                    <span>{{rating.toFixed(1)}}</span>
                </div>
                <p>
                    <span>月售{{month_sales}}单</span>
                    <span>售价¥{{foods.specfoods[0].price}}</span>
                    <span v-if="foods.specfoods.length">起</span>
                </p>
                <p>
                    <span>好评数{{rating_count}}</span>
                    <span>好评率{{satisfy_rate}}%</span>
                </p>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import ratingstar from '../../components/common/ratingStar.vue'
    import { shopListImgBaseUrl } from '../../config/env'

    export default {
        data(){
            return{
                imgBaseUrl: shopListImgBaseUrl,
                image_path:null,
                description:null,
                month_sales:null,
                name:null,
                rating:null,
                rating_count:null,
                satisfy_rate:null,
                foods:null,
                shopId:null,
            }
        },
        created(){
            this.image_path = this.$route.query.image_path;
            this.description = this.$route.query.description;
            this.month_sales = this.$route.query.month_sales;
            this.name = this.$route.query.name;
            this.rating = this.$route.query.rating;
            this.rating_count = this.$route.query.rating_count;
            this.satisfy_rate = this.$route.query.satisfy_rate;
            this.foods = this.$route.query.foodsitem;
            this.shopId = this.$route.query.shopId;

        },
        components:{
            headTop,
            ratingstar
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "../../style/mixin";

    .rating_page{
        position: absolute;
        top:0;
        bottom: 2rem;
        left: 0;
        right: 0;
        background: $fc;
        z-index: 15;
    }
</style>