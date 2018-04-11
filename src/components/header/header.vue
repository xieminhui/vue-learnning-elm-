<template>
    <header id='head_top'>
        <slot name="logo"></slot>
    </header>
    <router-link :to="userInfo?  '/profile' : '/login' " v-if='signinUp' class="head_login">
        <svg class="user_avatar" v-if="userInfo">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
        </svg>
        <span class="login_span" v-else>登录|注册</span>
    </router-link>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        mounted(){

        },
        props: ['signinUp'],
        computed:{
            ...mapState([
                'userInfo'
            ]),
        },
        methods:{
            ...mapActions([
                'getUserInfo'
            ]),
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
    .head_login{

    }
</style>