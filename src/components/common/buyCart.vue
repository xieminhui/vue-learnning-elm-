<template>
    <section class="cart_module">
        <section v-if="!foods.specifications.length" class="cart_button">
            <transition name="showReduce">
                <span @click="removeOutCart(foods)" v-if="foodNum">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
            </transition>
            <svg class="add_icon" @touchstart="addTocart(foods)">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
            </svg>
        </section>
        <section v-else class="choose_specification">
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg class="specs_reduce_icon" v-if="foodNum" @click="">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
            </section>
        </section>
    </section>
</template>
<script>
    import {mapState, mapMutations } from 'vuex'

    export default {
        data(){
            return{
                showMoveDot: [],//控制小圆点的显示隐藏
            }
        },
        mounted(){

        },
        computed: {

        },
        props:['foods', 'shopId'],
        methods:{
            //移出购物车
            removeOutCart(foods){

            },
            //加入购物车
            addTocart(foods){

            },
            //显示规格列表
            showChooseList(foods){

            },
            //点击多规格的商品的减按钮，弹出提示
            showReduceTip(){
                
            }
        }
    }
</script>
<style type="text/scss" scoped>

</style>