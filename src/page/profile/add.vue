<template>
    <div class="rating_page">
        <head-top head-title="新增地址" go-back='true'></head-top>
        <section class="adddetail">
            <form action="" @submit.prevent>
                <section class="ui-padding-block">
                    <div class="input-new">
                        <input type="text" placeholder="请填写你的姓名" :class="{verifies: verify}" v-model="message" @input="inputThing">
                        <p v-if="verify">请填写你的姓名</p>
                    </div>
                    <router-link to="/profile/info/address/add/addDetail" class="add-detail">
                        <div class="input-new">
                            <input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress">
                        </div>
                    </router-link>
                    <div class="input-new">
                        <input type="text" placeholder="请填写详细的送餐地址" :class="{verifies: verifythree}" v-model="mesthree" @input="inputThingthree">
                        <p v-if="verifythree">{{sendaddress}}</p>
                    </div>
                    <div class="input-new">
                        <input type="text" placeholder="请填写能够联系到你的手机号" :class="{verifies: verifyfour}" v-model="telenum" @input="inputThingfour">
                        <p v-if="verifythree">{{telephone}}</p>
                    </div>
                    <div class="input-new">
                        <input type="text" placeholder="备用联系电话（选填）"  v-model="standbytelenum" @input="inputThingfive">
                        <p v-if="verifythree">{{standbytele}}</p>
                    </div>
                </section>
                <section class="addbutton">
                    <button :class="{butopacity:butpart}" @click.prevent="submiThimg">新增地址</button>
                </section>
            </form>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import alertTip from '../../components/common/alertTip.vue'
    import { mapState } from 'vuex'
    export default {
        data(){
            return{
                verify:false,			//姓名
                verifytwo:false,		//备注
                verifythree:false,		//地址
                verifyfour:false,		//电话
                verifyfive:false,		//备用电话
                butpart:true,			//新增地址按钮的透明度
                sendaddress:'',  //地址
                message:'', //信息
                mesthree:'', //送餐地址
                telenum:'', //手机号
                telephone:'', //手机号提示
                standbytele:'', //备用手机号提示
                standbytelenum:'', //备用手机号
                addSearch:false, //添加搜索地址
                newAddress:{},			//增加数组的元素
                showAlert: false, //弹出框
                alertText: null, //弹出信息
            }
        },
        mounted(){

        },
        created(){

        },
        computed : {
            ...mapState([
                'addAddress'
            ])
        },
        components: {
            headTop,
            alertTip
        },
        methods: {
            inputThing(){

            },
            inputThingthree(){

            },
            inputThingfour(){

            },
            inputThingfive(){

            },
            submiThimg(){

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
        padding-top: 2.3rem;
        background-color: #f2f2f2;
        .adddetail{
            .ui-padding-block{
                background-color: $fc;
                padding: 0 .5rem .4rem;
                .input-new{
                    input{
                        margin-top: .4rem;
                        padding: .4rem;
                        background-color: $bc;
                        width: 100%;
                        border-radius: .1rem;
                    }
                }
            }
            .addbutton{
                margin: .5rem ;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $green;
                border-radius: .1rem;
                button{
                    color:#FFFFFF;
                    background: none;
                    width: 100%;
                    font-size: .6rem;
                    line-height: 1.6rem;
                }
                .butopacity{
                    opacity: .6;
                }
            }
        }
    }
</style>