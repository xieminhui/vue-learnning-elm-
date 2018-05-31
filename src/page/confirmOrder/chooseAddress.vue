<template>
    <div class="rating_page">
        <head-top head-title="选择地址" go-back="true"></head-top>
        <router-link to="/confirmOrder/chooseAddress/addAddress" class="add_icon_footer">
            <img src="../../images/add_address.png" height="24" width="24">
            <span>新增收货地址</span>
        </router-link>
        <section id="scroll_section" class="scroll_container">
            <section class="list_container">
                <ul class="deliverable_address">
                    <li v-for="(item, index) in deliverable" @click.prevent.stop="chooseAddress(item, index)">
                        <svg class="choosed_address" :class="{default_address: defaultIndex == index}">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            <div>
                                <header>
                                    <span>{{item.name}}</span>
                                    <span>{{item.sex == 1?'先生':'女士'}}</span>
                                    <span>{{item.phone}}</span>
                                </header>
                                <div class="address_detail ellipsis">
                                    <span v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{item.tag}}</span>
                                    <p>{{item.address_detail}}</p>
                                </div>
                            </div>
                        </svg>
                    </li>
                </ul>
                <section id="out_delivery" v-if="deliverdisable.length">
                    <header class="out_header">以下地址超出配送范围</header>
                    <ul class="deliverable_address">
                        <li v-for="(item, index) in deliverdisale">
                            <svg class="choosed_address">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                            <div>
                                <header>
                                    <span>{{item.name}}</span>
                                    <span>{{item.sex == 1?'先生':'女士'}}</span>
                                    <span>{{item.phone}}</span>
                                </header>
                                <div class="address_detail ellipsis">
                                    <span v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{item.tag}}</span>
                                    <p>{{item.address_detail}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
        <alert-tip v-if="shwoAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { mapState, mapMutations } from 'vuex'

    export default {
        data(){
            return {
                alertText:null,
                addressList: [], //地址列表
                deliverable: [], //有效地址列表
                deliverdisable: [], //无效地址列表
                showAlert: false,
            }
        },
        created(){

        },
        mounted(){

        },
        components: {
            headTop,
            alertTip
        },
        computed: {

        },
        methods: {
            async initData(){

            },
            chooseAddress(){

            },

        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "../../style/mixin";
    .rating_page{
        position: fixed;
        top:0;
        left: 0;
        right:0;
        bottom:0;
        background-color: $fc;
        z-index: 222;
        padding-top: 1.95rem;
        .add_icon_footer{
            position: fixed;
            bottom: 0px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            height: 2.5rem;
            justify-content: center;
            span{
                @include sc(0.75rem, $blue);
                margin-left: 0.2rem;
            }
        }
    }
</style>