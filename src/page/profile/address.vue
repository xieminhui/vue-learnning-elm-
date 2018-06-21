<template>
    <div class="rating_page">
        <head-top head-title="编辑地址" go-back="true">
            <span slot="edit" class="edit" @click="editThing">{{editText}}</span>
        </head-top>
        <section class="address">
            <ul class="addresslist">
                <li v-for="(item, index) in removeAddress">
                    <div>
                        <p>{{item.address}}</p>
                        <p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
                    </div>
                    <div class="deletesite" v-if="deletesite">
                        <span @click="deleteSite(index, item)">x</span>
                    </div>
                </li>
            </ul>
            <router-link to="/profile/info/address/add">
                <div class="addsite">
                    <span>新增地址</span>
                    <span class="addsvg">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </router-link>
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>
<script>
    import headTop from '../../components/header/header.vue'
    export default {
        data(){
            return{
                editText: '编辑',
                removeAddress:[],
                deletesite:false,
            }
        },
        mounted(){

        },
        created(){

        },
        computed: {

        },
        components : {
            headTop,
        },
        methods:{
            editThing(){

            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin.scss";
    .rating_page{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: 1.95rem;
        .edit{
            right: 0.4rem;
            @include sc(0.7rem, #fff);
            @include ct;
        }
        .addsite{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid $bc;
            border-top: 1px solid $bc;
            padding: .4rem;
            background-color: $fc;
            @include sc(0.8rem, #333);
            margin-top: .6rem;
            .addsvg{
                svg{
                    @include wh(.8rem, .8rem);
                }
            }
        }
        .router-slid-enter-active,.router-slid-leave-active{
            transition:  all .4s;
        }
        .router-slid-enter,.router-slid-leave-to{
            transform: translate3d(2rem, 0, 0);
            opacity: 0;
        }
    }
</style>