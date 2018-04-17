<template>
    <div>
        <head-top signin-up='msite' :head-title="cityName" v-on:goto="gotoHome">
            <router-link>

            </router-link>
        </head-top>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'

    export default {
        data(){
            return{
                geohash:'',//url参
                cityName:'1'
            }
        },
        computed:{

        },
        mounted(){

        },
        components:{
            headTop
        },
        methods:{
            gotoHome(){
                this.$router.push({ path: '/home' })
            }
        }
    }
</script>

<style>

</style>