<template>
    <div class="rating_page">
        <headtop head-title="商家详情" go-back="true"></headtop>
        <section class="acivities_contianer">
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
                    <span>{{item.description}}</span>
                </li>
            </ul>
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
    .rating_page{
        z-index: 180;
    }
</style>