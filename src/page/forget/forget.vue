<template>
    <div class="restContainer">
        <head-top head-title="重置密码" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号" name="phone" maxlength="11" v-model=>
            </section>
        </form>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'

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
            headTop
        },
        computed:{

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped type="text/scss">

</style>