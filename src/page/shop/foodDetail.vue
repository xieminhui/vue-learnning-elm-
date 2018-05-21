<template>
    <div class="rating_page">
        <head-top :head-title="name" go-back="true"></head-top>
    </div>
</template>

<script>
    import headTop from '../../components/header/header.vue'
    import { shopListImgBaseUrl } from '../../config/env'

    export default {
        data(){
            return{

            }
        },
        created(){

        },
        components:{
            headTop
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "../../style/mixin";
</style>