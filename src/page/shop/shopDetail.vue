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
                    
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
    import headtop from '../../components/header/header'
    import { mapState } from 'vuex'

    export default {
        data(){
            return{

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
    }
</style>