<template>
    <div class="restContainer">
        <head-top head-title="重置密码" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone">
            </section>
            <section class="input_container">
                <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
            </section>
            <section class="input_container">
                <input text="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="6" v-model="mobileCode">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="login_container" @click="resetButton">确认修改</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { getCaptchas, changePassWord} from '../../service/fetchData'

    export default {
        data(){
            return{
                phoneNumber: null, //电话号码
                oldPassWord: null,
                newPassWord: null, //新密码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                confirmPassWord: null, //确认密码
                captchaCodeImg: null, //验证码地址
                mobileCode: null, //短信验证码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile',//注册方式
                captchaCodeImg: null,
            }
        },
        mounted(){

        },
        created(){
            this.getCaptchaCode();
        },
        components:{
            headTop,
            alertTip
        },
        computed:{

        },
        methods: {
            async getCaptchaCode(){
                let res = await getCaptchas();
                this.captchaCodeImg = res.code;
            },
            inputPhone(){
                if(/.*/gi.test(this.phoneNumber)){
                    this.rightPhoneNumber = true;
                }else{
                    this.rightPhoneNumber = false;
                }
            },
            async resetButton(){
                if(!this.phoneNumber){
                    this.showAlert = true;
                    this.alertText = '请输入正确的账号';
                    return
                }else if(!this.oldPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入旧密码';
                    return
                }else if(!this.newPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入新密码';
                    return
                }else if(!this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入确认密码';
                    return
                }else if(this.newPassWord !== this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '两次输入密码不一致';
                    return
                }else if(!this.mobileCode){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                let res = changePassWord(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
                if(res.message){
                    this.showAlert = true;
                    this.alertText = res.message;
                    this.getCaptchaCode();
                    return
                }else{
                    this.showAlert = true;
                    this.alertText = '密码修改成功';
                }
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin";
    .restContainer{
        padding-top: 2.5rem;
        .restForm{
            .input_container{
                @include sc(0.8rem, #666);
                padding: 0.4rem 1rem;
                background-color: $fc;
                margin-top: 0.05rem;
            }
            input{
                font-size: 0.75rem;
            }
            .captcha_code_container{
                display: flex;
                justify-content: space-between;
                .img_change_img{
                    display: flex;
                    img{
                        width: 2.5rem;
                        margin-right: 0.2rem;
                    }
                    .change_img{
                        font-size: 0.6rem;
                        p:nth-of-type(2){
                            color: $blue;
                        }
                    }
                }
            }
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
    }
</style>