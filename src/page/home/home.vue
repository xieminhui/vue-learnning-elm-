<template>
    <div>
        <headTop signin-up='home'>
            <span slot='logo' class="head_logo" @click="reload">elb</span>
        </headTop>
    </div>
</template>
<script>
    import headTop from '../../components/header/header'

    export default {
        data(){
            return{

            }
        },
        mounted(){

        },
        components:{
            headTop
        },
        computed:{

        },
        methods:{
            //重撸界面
            reload(){
                window.location.reload();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";

    .head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
</style>