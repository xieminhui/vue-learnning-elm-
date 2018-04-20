<!--
    评论星星原理：
    先生成一个五颗黄色星星，接着再生成一个五颗灰色星星，然后传入rating控制黄色星星div长度，overflow：hidden
-->
<template>
    <div class="rating_contianer">
        <section class="star_contianer">
            <svg class="grey_fill" v-for="num in 5" :key="num">
                <use xmlns:xlink="http://www.w3.org/2001/xlink" xlink:href="#star"></use>
            </svg>
        </section>
        <div :style="{width: rating*2/5 + 'rem'}" class="star_overflow">
            <section class="star_contianer">
                <svg class="orange_fill" v-for="num in 5" :key="num">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:HREF="#star"></use>
                </svg>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:['rating']
    }
</script>

<style lang="scss" scoped type="text/scss">
    @import "../../style/mixin";
    .rating_container{
        position: relative;
        top: .2rem;
        @include wh(2rem, .4rem);
        .star_overflow{
            overflow: hidden;
            position: relative;
            height: 100%;
        }
        .star_container{
            position: absolute;
            display: flex;
            width: 2rem;
            height: 0.4rem;
            top: -0.02rem;
            left: -0.02rem;
            .grey_fill{
                fill: #d1d1d1;
            }
            .orange_fill{
                fill: #ff9a0d;
            }
        }
    }
</style>