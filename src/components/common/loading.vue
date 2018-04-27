<template>
    <div class="loading_container">
        <div class="load_img"  :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
        <svg class="load_ellipse" xmlns="http://www.w3.org/1999/svg" version="1.1">
            <ellipse cx="26" cy="10" ry="10" style="fill:#ddd;stroke: none"> </ellipse>
        </svg>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                positionY: 0,
                timer:null
            }
        },
        mounted(){
            let that = this;
            this.timer = setInterval(() =>{
                that.positionY++;
            }, 600)
        },
        beforeDestroy(){
            clearInterval(this.timer);

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    @keyframes load {
        0% {
            -webkit-transform: translateY(0px);
            -moz-transform: translateY(0px);
            -ms-transform: translateY(0px);
            -o-transform: translateY(0px);
            transform : translateY(0px);
        }
        50% {
            -webkit-transform: translateY(-50px);
            -moz-transform: translateY(-50px);
            -ms-transform: translateY(-50px);
            -o-transform: translateY(-50px);
            transform: translateY(-50px);
        }
        100% {
            -webkit-transform: translateY(0px);
            -moz-transform: translateY(0px);
            -ms-transform: translateY(0px);
            -o-transform: translateY(0px);
            transform : translateY(0px);
        }
    }
    @keyframes ellipse {
        0% {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50% {
            -webkit-transform: scale(0.3);
            -moz-transform: scale(0.3);
            -ms-transform: scale(0.3);
            -o-transform: scale(0.3);
            transform: scale(0.3);
        }
        100% {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    .loading_container{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @include wh(2.5rem, 2.5rem);
    }
    .load_img{
        @include wh(100%, 100%);
        background: url("../../images/icon_loading.png") no-repeat 0 0;
        background-size: 2.5rem auto;
        transform: translateY(0px);
        animation: load 0.6s infinite ease-in-out;
        position: relative;
        z-index: 11;
    }
    .load_ellipse{
        position: absolute;
        @include wh(2.6rem, 2rem);
        top: 2.2rem;
        z-index:10;
        animation: ellipse 0.6s infinite ease-in-out;
    }
</style>