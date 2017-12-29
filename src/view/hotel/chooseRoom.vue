<template>
    <div id="cr">
        <header>
            <div class="row-cr">
                <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
                <p class="strong">选择房型</p>
            </div>
        </header>

        <div class="container-cr">
            <p class="hotelRoom" v-for="(item,index) in hotelRoom" :key="index">
                <span class="big">{{ item.type }}</span>
                <span class="reserve-cr big" @click="roomReserve(item)">
                    预定
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    import { XButton } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                hotelRoom:[]
            }
        },
        store,
        components:{
            XButton
        },
        mounted(){
            this.hotelRoom = store.state.hotelRoomType;
        },
        methods:{
            roomReserve(item){
                this.$router.push({path:"/hotelDetail/order",query:{type:item.type,price:item.price,hotelid:this.$route.query.hotelid}})
            }
        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/chooseRoom.css');
</style>


