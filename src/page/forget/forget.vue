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

        },
        components:{
            headTop,
            alertTip
        },
        computed:{

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped type="text/scss">

</style>