<template>
    <div class="profile_page">
        <head-top go-back="true" :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo && userInfo.user_id ? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo && userInfo.user_id">
                    <span class="privateImage">
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p>{{username}}</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                </ul>
            </section>
        </section>
    </div>
</template>
<script>
    import headTop from '../../components/header/header.vue'
    import footGuide from '../../components/footer/footGuide.vue'
    import { mapState }from 'vuex'
    import {shopListImgBaseUrl} from '../../config/env'
    export default {
        data(){
            return{
                profiletitle : '我的',
                imgBaseUrl : shopListImgBaseUrl,

            }
        },
        mounted(){

        },
        created(){

        },
        computed: {
            ...mapState([
                'userInfo'
            ])
        },
        components:{
            headTop,
            footGuide
        }
    }
</script>
<style>

</style>