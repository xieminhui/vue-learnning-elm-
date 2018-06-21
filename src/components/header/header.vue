<template>
    <header id='head_top'>
        <slot name="logo"></slot>
        <slot name="search"></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2001/svg" version="1.1">
                <polyline points="12,18, 4,8 12,0" style="fill:none;stroke: rgb(255,255,255);stroke-width: 2"/>
            </svg>
        </section>
        <router-link :to="userInfo?  '/profile' : '/login' " v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle" @click="gotoUrl">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="changecity"></slot>
        <slot name="edit"></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        mounted(){
            this.getUserInfo();
        },
        props: ['signinUp','headTitle', 'goBack'],
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods:{
            ...mapActions([
                'getUserInfo'
            ]),
            gotoUrl(){
                this.$emit('goto')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";

    #head_top{
        position: fixed;
        top:0;
        left: 0;
        z-index: 100;
        background-color: $blue;
        @include wh(100%,1.95rem);
    }
    .head_goback{
        margin-left: 0.5rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
    }
    .head_login{
        @include sc(0.65rem, #fff);
        @include ct;
        right: 0.55rem;
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
    .user_avatar{
        fill: #fff;
        width: 0.8rem;
        height: 0.8rem;
    }
</style>