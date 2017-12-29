<template>
    <div>
        <header>
            <div class="header-map">
                <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
                <span class="big">位置</span>
            </div>
        </header>
        <div id="allmap" v-bind:style="{'width':'100%','height':mapHeight+'px'}"></div>
        <footer>
            <div class="footer-map">
                <p class="big">{{ hotelname }}</p>
                <p>{{ address_detail }}</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import {MP} from '../../../static/js/hotel/map.js'
    import store from '../../store/store.js'
    export default {
        data(){
            return{
                address_detail: null, //详细地址
                mapHeight:500,    
                hotelname:null, //酒店名  
            }
        },
        store,
        mounted(){
                this.address_detail = this.$route.query.address;    //获取路由地址上的参数
                this.hotelname = this.$route.query.hotel;

                this.mapHeight = document.documentElement.clientHeight;     //定义地图的高度
                this.$nextTick(function(){
                    MP("mdWMSNGaFN1RrkRBX7PCIxDkvH2H05e2").then( BMap => {
                        var th = this;
                        var map = new BMap.Map("allmap");            // 创建Map实例
                        map.enableScrollWheelZoom();    //允许用户对地图进行缩放

                        var myGeo = new BMap.Geocoder();
                        var local = new BMap.LocalSearch(map,{
                            // renderOptions:{map: map,pageCapacity:2},
                            onSearchComplete(){
                                let location = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                                map.centerAndZoom(location, 18);
                                map.addOverlay(new BMap.Marker(location));    
                            }
                        });
                        local.search(th.hotelname);
                    })
                })
        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/map.css');
</style>


