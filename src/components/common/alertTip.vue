<template>
    <div class="alert_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confirm" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
    export  default {
        data(){
            return{

            }
        },
        mounted(){

        },
        props: ['alertText'],
        methods:{
            closeTip(){
                this.$emit('closeTip');
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin";
    @keyframes tipMove {
        0% {transform: scale(1)}
        35% {transform: scale(0.8)}
        70% {transform: scale(1.1)}
        100% {transform: scale(1)}
    }
    .alert_container{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index: 200;
        .tip_text_container{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -6rem;
            margin-left: -6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: $fc;
            border-radius: 0.2rem;
            width:12rem;
            animation: tipMove .4s;
            text-align: center;
            .tip_icon{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                @include wh(3rem, 3rem);
                border: 0.15rem solid #f8cb86;
                border-radius: 50%;
                margin: .6rem;
                span:nth-of-type(1){
                    @include wh(0.12rem, 1.5rem);
                    background-color: #f8cb86;
                }
                span:nth-of-type(2){
                    @include wh(.2rem, .2rem);
                    border: 1px;
                    border-radius: 50%;
                    margin-top: .2rem;
                    background-color: #f8cb86;
                }
            }
            .tip_text{
               margin-bottom: .8rem;
                @include sc(0.7rem, #666);
            }
            .confirm{
                padding: .4rem;
                @include sc(0.8rem, $fc);
                font-weight: bolder;
                width: 100%;
                background-color: #4cd964;
                border-bottom-left-radius: 0.25rem;
                border-bottom-right-radius: 0.25rem;
            }
        }
    }
</style>