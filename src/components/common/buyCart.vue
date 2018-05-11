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
                    <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
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
            ...mapState([
                'cartList'
            ]),
            /*
            * 监听cartList变化，注意assign这个方法是假的深拷贝，他只能深拷贝一层，如果某个对象的属性使对象，那么这个属性就不是深拷贝了
            * */
//            shopCart(){
//                return object.assign({},this.cartList[this.shopId]);
//            }
            /*
            * cartList变化时重新计算当前商品的数量
            * */
            foodNum(){
                let shopCart = this.cartList[this.shopId];
                let category_id = this.foods.category_id;
                let item_id =this.fodds.item_id;
                if(shopCart && shopCart[category_id] && shopCart[category_id][item_id]){
                    let num =0;
                    let obj = shopCart[category_id][item_id];
                    for(let key in obj){
                        num += obj.key['num'];
                    }
                    return num;
                }else{
                    return 0;
                }
            }
        },
        props:['foods', 'shopId'],
        methods:{
            ...mapMutations([
                'ADD_CART', 'REDUCE_CART',
            ]),
            //移出购物车
            removeOutCart(foods){
                if(this.foodNum > 0){
                    this.REDUCE_CART({
                        shopid: this.shopId,
                        category_id: this.foods.category_id,
                        item_id: this.foods.item_id,
                        food_id: this.foods.specfoods[0].food_id,
                        name: this.foods.specfoods[0].name,
                        price: this.foods.specfoods[0].price,
                        specs: '',
                        packing_fee:this.foods.specfoods[0].packing_fee,
                        sku_id:this.foods.specfoods[0].sku_id,
                        stock: this.foods.specfoods[0].stock
                    });
                }
            },
            //加入购物车
            addTocart(foods,event){
                this.ADD_CART({
                    shopid: this.shopId,
                    category_id: this.foods.category_id,
                    item_id: this.foods.item_id,
                    food_id: this.foods.specfoods[0].food_id,
                    name: this.foods.specfoods[0].name,
                    price: this.foods.specfoods[0].price,
                    specs: '',
                    packing_fee:this.foods.specfoods[0].packing_fee,
                    sku_id:this.foods.specfoods[0].sku_id,
                    stock: this.foods.specfoods[0].stock
                });
                let eleLeft = event.target.getBoundingClientRect().left;
                let eleBottom = event.target.getBoundingClientRect().bottom;
                this.showMoveDot.push(true);
                this.$emit('showMoveDot', this.showMoveDot, eleLeft, eleBottom);
            },
            //显示规格列表
            showChooseList(foods){
                this.$emit('showChooseList', foods);
            },
            //点击多规格的商品的减按钮，弹出提示
            showReduceTip(){
                this.$emit('showReduceTip');
            }
        }
    }
</script>
<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin";

    .cart_module{
        .add_icon{
            position: relative;
            z-index: 999;
        }
        .cart_button{
            display: flex;
            align-items: center;
        }
        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
        .specs_reduce_icon{
            fill: #999;
        }
        .cart_num{
            @include sc(.65rem, #666);
            min-width: 1rem;
            text-align: center;
            font-family: Helvetica Neue,Tahoma;
        }
        .choose_specification{
            .choose_icon_container{
                display: flex;
                align-items: center;
                .show_chooselist{
                    display: block;
                    @include sc(0.55rem, #fff);
                    padding: .1rem .2rem;
                    background: $blue;
                    border-radius: .2rem;
                    border:1px solid $blue;
                }
            }
        }
    }
    .showReduce-enter-active .showReduce-leave-active{
        -webkit-transform: all .3s ease-out;
        -moz-transform: all .3s ease-out;
        -ms-transform: all .3s ease-out;
        -o-transform: all .3s ease-out;
        transform: all .3s ease-out;
    }
    .showReduce-enter, showReduce-leave-to{
        opacity: 0;
        -webkit-transform: translateX(1rem);
        -moz-transform: translateX(1rem);
        -ms-transform: translateX(1rem);
        -o-transform: translateX(1rem);
        transform: translateX(1rem);
    }
    .fade-enter-active, .fade-leave-active{
        -webkit-transform: all .3s;
        -moz-transform: all .3s;
        -ms-transform: all .3s;
        -o-transform: all .3s;
        transform: all .3s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .fadeBounce-enter-active,.fadeBounce-leave-active{
        -webkit-transform: all .3s;
        -moz-transform: all .3s;
        -ms-transform: all .3s;
        -o-transform: all .3s;
        transform: all .3s;
    }
    .fadeBounce-enter,.fadeBounce-leave-to{
        opacity: 0;
        -webkit-transform: scale(.7);
        -moz-transform: scale(.7);
        -ms-transform: scale(.7);
        -o-transform: scale(.7);
        transform: scale(.7);
    }
</style>