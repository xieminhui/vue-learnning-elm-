<template>
    <div class="city_container">
        <head-top :head-title="cityName" go-back="true">
            <router-link to="/home" slot="changecity" class="changge_city">切换城市</router-link>
        </head-top>
        <form class="city_form" @submit.prevent>
            <div>
                <input v-model="searchValue" type="text" class="search_input input_style" placeholder="请输入学校、商务楼、地址" required>
            </div>
            <div>
                <input type="submit" class="city_submit input_style" value="提交" @click='serchPois' />
            </div>
        </form>
        <header v-if="historyTitle" class="serachHistory">搜索历史</header>
        <ul class="searchresultList">
            <li class="serchResult" v-for="(value,index) in serchResult" @click="gotoRestaurants(index, value.geohash)">
                <h4>{{value.name}}</h4>
                <p>{{value.address}}</p>
            </li>
        </ul>
        <div v-if="noResult" class="noResult">
            很抱歉！无搜索结果
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import { getCityInfoByid, getAddressBySearch } from '../../service/fetchData'
    import { setItem, getItem } from "../../config/myUtils"

    export default {
        data(){
            return{
                cityName:'',//当前城市名字
                cityId:'',//当前城市id
                searchValue:'',//地址搜索
                historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                serchResult:[],//搜索结果
                noResult:false//搜索无结果，提示
            }
        },
        computed:{

        },
        mounted(){
            this.cityId = this.$route.params.cityId;
            getCityInfoByid(this.cityId).then(res => {
                this.cityName = res.name;
            })
            //从localstorage获取搜索历史
            this.searchResult = getItem('searchHistory');
        },
        components:{
            headTop
        },
        methods:{
            serchPois(){
                if(this.searchValue){
                    getAddressBySearch(this.cityId, this.searchValue).then(res =>{
                        this.serchResult = res;
                        this.historyTitle = false;
                        this.noResult = res.length? false : true;
                    })
                }
            },
            /*
            *  点击搜索结果进入下一页面拿出localstorage判断是否有值，有就push，没有
            *  没有就新增
            * */
            gotoRestaurants(index, geohash){
                let searchHistory = getItem('searchHistory');
                let temp = this.searchResult[index];
                if(searchHistory){
                    for(var i=0;i<searchHistory.length;i++){
                        if(searchHistory[i].geohash == geohash){
                            break;
                        }
                    }
                    if(i == searchHistory.length){
                        this.searchHistory.push(temp);
                    }

                }else{
                    this.searchHistory.push(temp);
                }
                setItem('searchHistory', searchHistory);
                this.$router.push({path: '/mise', query:{geohash}});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";
    .city_container{
        padding-top: 2.35rem;
    }
    .changge_city{
        @include ct;
        right:0.5rem;
        @include sc(0.6rem, #fff);
    }
    .city_form{
        padding-top: 0.4rem;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        background: $fc;
        div{
            width: 90%;
            text-align: center;
            margin: 0 auto;
            .input_style{
                border: 1px solid $bc;
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem)
            }
            .search_input{
                padding-left: 0.4rem;
                @include sc(0.65rem, #333)
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, $fc);
            }
        }
    }
    .serachHistory{
        padding: 0.1rem 0.4rem;
        font-size:0.475rem;
    }
    .searchresultList{
        background: $fc;
        border-top:1px solid $bc;
        li{
            margin: 0 auto;
            border-bottom: 1px solid $bc;
            padding: 0.65rem;
            h4{
                @include sc(0.65rem,#333);
                margin-bottom: 0.35rem;
                width:90%;
            }
            p{
                @include sc(0.45rem, #999)
            }
        }

    }
    .noResult{
        margin: 0 auto;
        background: $fc;
        text-indent: 0.5rem;
        @include font(0.65rem, 1.75rem);    }
</style>