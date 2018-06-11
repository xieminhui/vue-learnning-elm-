<template>
    <div class="rating_page">
        <head-top head-title="账户信息" go-back="true"></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else>
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
            <router-link to="/profile/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>用户名</h2>
                    <div class="headportrait-div">
                        <p>{{username}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/info/address" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>收货地址</h2>
                    <div class="headportrait-div">
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <section class="bind-phone">
                账号绑定
            </section>
            <section class="info-router" @click="changePhone">
                <section class="headportrait headportraitwo headportraithree">
                    <h2><img src="../../images/bindphone.png" style="display: inline-block; margin-right: .4rem">手机</h2>
                    <div class="headportrait-div">
                        <p>{{infotel}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </section>
            <section class="bind-phone">
                安全设置
            </section>
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>登录密码</h2>
                    <div class="headportrait-div">
                        <p>修改</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
                <section class="exitlogin" @click="exitlogin">退出登录</section>
            </router-link>
        </section>
        <section class="coverpart" v-if="show">
            <section class="cover-backround"></section>
            <section class="cover-content" :class="{'cover-animate': isEnter, 'cover-animate-leave': isLeave}">
                <div class="sa-icon">
                    <span class="sa-body"></span>
                    <span class="sa-dot"></span>
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">再等等</button>
                    <div style="display: inline-block;">
                        <button class="quitlogin" @click="outLogin"></button>
                    </div>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { shopListImgBaseUrl } from '../../config/env'
    import { mapState } from 'vuex'
    import { uploadImg } from '../../service/fetchData'
    export default {
        data(){
            return{
                imgBaseUrl: shopListImgBaseUrl,
                username:'',    //用户名
                resetname:'', //重置用户名
                infotel:'',     //用户手机
                avatar:'',      //用户头像
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showAlert: false,
                alertText: null,
            }
        },
        created(){

        },
        mounted(){

        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        components : {
            headTop,
            alertTip
        },
        methods: {
            async uploadAvatar(){
                //上传头像
                if(this.userInfo){
                    let input = document.querySelector('.profileinfopanel-upload');
                    let data = new FormData();
                    data.append('file', input.files[0]);
                    try {
                        let res = await uploadImg(this.userInfo.user_id, data);
                        if(res.status == 1){
                            this.userInfo.avatar = res.image_path;
                        }
                    }catch (error){
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        throw new Error(error);
                    }
                }
            },
            changePhone(){

            },
            exitlogin(){

            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin";
    .rating_page{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
        padding-top: 1.95rem;
        background-color: #f2f2f2;
        .profile-info{
            margin-top: .4rem;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid $bc;
        }
        .headportrait{
            display: flex;
            background-color: $fc;
            justify-content: space-between;
            align-items: center;
            position: relative;
            border-bottom: 1px solid $bc;
            padding: .6rem .4rem;
            h2{
                display: flex;
                align-items: center;
                @include sc(0.6rem, #333);
            }
            .profileinfopanel-upload{
                position: absolute;
                left: 0;
                right: 0;
                top:0;
                bottom:0;
                width: 100%;
                z-index:2;
                opacity: 0;
            }
            .headportrait-div{
                display: flex;
                align-items: center;
                p{
                    @include sc(0.7rem, $fzGrey);
                }
                .headportrait-div-top{
                    @include wh(2rem, 2rem);
                    border-radius: 50%;
                    svg{
                        @include wh(2rem, 2rem);
                    }
                }
                .headportrait-div-bottom{
                    margin-left: .4rem;
                    svg{
                        @include wh(.7rem, .7rem)
                    }
                }
            }
        }
        .bind-phone{
            padding: .4rem;
            font-size: 0.5rem;
            color: #666;
            border-bottom: 1px solid $bc;
        }
        .exitlogin{
            margin: 1rem .5rem;
            padding: .3rem;
            @include sc(0.65rem, $fc);
            text-align: center;
            background-color: #d8584a;
            border-radius: .2rem;
        }
    }
</style>