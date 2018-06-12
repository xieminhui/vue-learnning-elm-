<template>
    <div class="rating_page">
        <head-top head-title="修改用户名" go-back="true"></head-top>
        <section class="setname">
            <section class="setname-top">
                <input type="text" placeholder="输入用户名" :class="{'setname-input':bordercolor}" @input="inputThing" v-model="inputValue">
                <div>
                    <p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
                    <p class="unlikep" v-else>用户名长度在5到24位之间</p>
                </div>
            </section>
            <section class="reset">
                <button :class="{fontopacity:opacityall}" @click="resetName">确认修改</button>
            </section>
        </section>
        <alert-tip :alertText="alertText" v-if="showAlert" @closeTip="showAlert = false;"></alert-tip>
    </div>
</template>
<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data(){
            return{
                inputValue:'',
                earn: true,
                bordercolor:false,
                opacityall:true,
                alertText:'请输入合法的用户名',
                showAlert: false,
            }
        },
        mounted(){

        },
        created(){

        },
        computed :{
            ...mapState([
                'userInfo'
            ])
        },
        components :{
            headTop,
            alertTip
        },
        methods : {
            ...mapMutations([
                'RETSET_NAME'
            ]),
            inputThing(){
                if(this.inputValue.length <5 || this.inputValue.length>24){
                    this.earn=false;
                    this.bordercolor=true;
                    this.opacityall=true;
                }else{
                    this.earn=true;
                    this.bordercolor=false;
                    this.opacityall=false;
                }
            },
            resetName(){
                if(this.opacityall){
                    this.showAlert = true;
                    return;
                }
                this.RETSET_NAME(this.inputValue);
                this.$router.go(-1);
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import "../../style/mixin";
    .rating_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 202;
        background: #f2f2f2;
        padding-top: 1.95rem;
        .setname{
            padding:  .4rem;
            .setname-top{
                input{
                    font-size: .8rem;
                    padding: .2rem;
                    width: 100%;
                    background-color: #F2F2F2;
                    border: 1px solid $bc;
                }
                .setname-input{
                    border-color: #ea3106;
                }
                p{
                    margin-top: .4rem;
                    font-size: .5rem;
                    color: #666;
                }
                .unlikep{
                    color: #ea3106;
                }
            }
            .reset{
                margin-top: .6rem;
                background-color: $blue;
                width: 100%;
                button{
                    @include sc(.8rem, $fc);
                    width: 100%;
                    line-height: 1.8rem;
                    background: none;

                }
                .fontopacity{
                    -webkit-transition: all 1s;
                    transition: all 1s;
                    opacity: .6;
                }
            }
        }
    }
</style>