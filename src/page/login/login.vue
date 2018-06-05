<template>
    <div class="loginCotainer">
        <head-top :head-title="loginWay? '登录' : '密码登录' " goBack="true"></head-top>
        <form class="loginForm" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button @click.prevent v-show="computedTime">已发送({{computedTime}})</button>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
        </form>
        <form class="loginForm" v-else>
            <section class="input_container">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                <input v-else type="text" placeholder="密码" v-model="passWord">
                <div class="button_switch" :class="{change_to_text:showPassword}">
                    <div class="circel_button" :class="{trans_to_right:showPassword}" @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册过得账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { mapState, mapMutations } from 'vuex'
    import { getCaptchas, accountLogin} from '../../service/fetchData'
    export default {
        data(){
            return{
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: null, //电话号码
                mobileCode: null, //短信验证码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            this.getCaptchaCode();
        },
        components:{
            headTop,
            alertTip
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            changePassWordType(){
                this.showPassword = !this.showPassword;
            },
            //获取验证码
            async getCaptchaCode(){
                let res = await getCaptchas();
                this.captchaCodeImg = res.code;
            },
            async mobileLogin(){
                if(this.loginWay){

                }else{
                    if(!this.userAccount){
                        this.showAlert = true;
                        this.alertText = '请输入手机号/邮箱/用户名';
                        return;
                    }else if(!this.passWord){
                        this.showAlert = true;
                        this.alertText = '密码';
                        return;
                    }else if(!this.codeNumber){
                        this.showAlert = true;
                        this.alertText = '请输入验证码';
                        return;
                    }
                    this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
                    //如果放回不正確，則弹出提示框
                    if(!this.userInfo.user_id){
                        this.showAlert = true;
                        this.alertText = this.userInfo.message;
                        if(!this.loginWay) this.getCaptchaCode();
                    }else{
                        this.RECORD_USERINFO(this.userInfo);
                        this.$router.go(-1);
                    }
                }
            },

        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin";
    .loginCotainer{
        padding-top: 2.5rem;
        .loginForm{
            .input_container{
                display: flex;
                justify-content: space-between;
                background-color: $fc;
                border-bottom: 1px solid $bc;
                padding: 0.6rem .8rem;
                input{
                    @include sc(.7rem, #666);
                }
                .button_switch{
                    display: flex;
                    position: relative;
                    justify-content: center;
                    @include wh(2rem, 0.7rem);
                    border-radius: 0.5rem;
                    background: #ccc;
                    .circel_button{
                        position: absolute;
                        top:-0.25rem;
                        left:-0.25rem;
                        left:-0.25rem;
                        transition: all .3s;
                        background: #f1f1f1;
                        @include wh(1.2rem, 1.2rem);
                        box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
                        border-radius: 50%;
                    }
                    span{
                        @include sc(0.45rem, #fff);
                        vertical-align: middle;
                        line-height: 100%;
                    }
                }
                .change_to_text{
                    background: #4cd964;
                }

                .trans_to_right{
                    transform: translateX(1.3rem);
                }
            }
        }
        .captcha_code_container{
            height: 2.2rem;
            align-items: center;
            .img_change_img{
                display: flex;
                justify-content: center;
                img{
                    width: 3.5rem;
                    height: 1.5rem;
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: column;
                    @include sc(0.55rem, #666);
                    width: 2rem;
                    P:nth-of-type(2){
                        color: $blue;
                        margin-top: .2rem;
                    }
                }
            }
        }
        .login_tips{
            padding: 0.2rem .8rem;
            @include sc(0.5rem, red);
        }
        .login_container{
            margin: .5rem ;
            padding: .5rem;
            text-align: center;
            background-color: #4cd964;
            color: #ffffff;
            font-size: 0.7rem;
            border-radius: .25rem;
        }
        .to_forget{
            float: right;
            font-size: 0.6rem;
            color: #3b95e9;
            margin-right: .3rem;
        }

    }
</style>