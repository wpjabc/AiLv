<template>
    <div>
        <header>
            <div class="row-so">
                <x-icon @click="$router.go(-4)" type="ios-close-empty" size="50"></x-icon>
                <p class="strong">订单信息</p>
            </div>
        </header>
        <group>
            <cell-form-preview class="big" :list="list"></cell-form-preview>
            <cell class="big red" :title="('房费总计')" :value="'￥'+orderInfo.roundNumber*orderInfo.price"></cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell, CellFormPreview } from 'vux'
    import store from '../../store/store.js'
    import axios from 'axios'
    export default {
        data(){
            return{
                orderInfo:{},
                list: [],
            }
        },
        store,
        components:{
            Group,
            Cell,
            CellFormPreview
        },
        mounted(){
            let _this = this;
            store.commit('getHotelOrder',function(arg,hotelid){
                _this.orderInfo = arg;
                _this.list = [
                    {label: '房型信息',value: arg.type},
                    {label: '入住时间',value: arg.start},
                    {label: '离店时间',value: arg.end},
                    {label: '房间数量',value: arg.roundNumber},
                    {label: '房费单价',value: arg.price}
                ]
            });
            console.log('酒店ID:'+this.$route.query.hotelid)
            // store.state.historyHotelOrderID.push(this.$route.query.hotelid) ;
            this.$ajax.get("../../../static/json/hotel/hotel.detail.json")
            .then(res => {
                var data = res.data.data;
                for(let i=0;i<data.length;i++){
                    if(this.$route.query.hotelid==data[i].hotelid){
                        store.state.HistoryDataHotel.push(data[i]);
                    }
                }
            });
        },
        methods:{

        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/showOrder.css');
</style>


