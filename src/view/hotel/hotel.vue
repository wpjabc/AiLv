<template>
    <div id="hotelPage">
        <!-- 搜索目的地·房源 -->
        <header>
            <div class="fixed">
                <div class="headerSeleted">
                    <x-icon class="headerIcon" type="ios-arrow-left" size="30" @click="$router.go(-1)"></x-icon>
                    <x-input class="headerInput" titile="使用ICON代替title" placeholder="任何目的地 · 房源" v-model="seachVal"></x-input>
                    <i class="iconfont" @click="hotelSeachAction">&#xe6dc;</i>
                </div>
                <div class="hiddenAction" @click="$router.push({path:'/filter'})">
                    <x-button mini class="headerBtn">筛选条件</x-button>
                </div>
            </div>
        </header>

        <!-- 主体内容 -->
        <div class="container">
            <!-- 酒店列表 -->
            <div class="hotelList" v-for="(item,index) in hotelList" :key="index" >
                <!-- 酒店图片 -->
                <div class="hotelImg" @click="$router.push({path:'hotelDetail?hotelid='+item.hotelid})">
                    <swiper :list="item.img" :aspect-ratio="500/800" @on-index-change="onIndexChange(index)"></swiper>
                </div>
                <div class="hotelPrice">
                    <div class="row">
                        <!-- 价格 -->
                        <span class="strong big">￥{{ item.minprice }}</span>
                        <!-- 评价 -->
                        <div>
                            <rater v-model="item.score" active-color="#03764B" :font-size="20" disabled></rater>
                            <span class="normal">{{ item.score }}</span><span class="small">/5分</span>
                        </div>
                    </div>
                    <!-- 地址 -->
                    <p class="location strong normal">【{{ item.hotelname }}】{{ item.location }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { XInput, Group, XButton, Swiper, Rater } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                hotel_index:[],
                hotelList:[],
                hotelSeach:[],
                allHotel:[],
                scrollTop:0,
                seachVal:null
            }
        },
        components:{
            XInput,
            Group,
            XButton,
            Swiper,
            Rater
        },
        store,
        mounted(){  //初始化调用方法
            this.getHotelInfo();
            this.bindScrollAction();
        },
        methods:{
            // 轮播图滚动变化
            onIndexChange(index){
                this.hotel_index[index] = index;
            },
            //绑定页面滚动事件
            bindScrollAction(){
                window.onscroll = function(){
                    // 滚动监听头部搜索组件的样式变化

                    let top = document.getElementsByTagName('body')[0].scrollTop;
                    let fixed = document.getElementsByClassName('fixed')[0];
                    let btn = document.getElementsByClassName('hiddenAction')[0];

                    if(!fixed || !btn){return false;}
                    
                    if(top > this.scrollTop){
                        btn.style.marginTop = '-2rem';

                    }else{
                        btn.style.marginTop = '10px';
                    }

                    if(top > 0){
                        fixed.style.boxShadow = '0px 5px 10px rgba(0,0,0,0.3)';
                    }else{
                        fixed.style.boxShadow = 'none';
                    }
                    
                    this.scrollTop = top;
                }
            },
            //异步获取酒店列表信息的方法
            getHotelInfo(){
                var hotelType = store.state.hotelType;
                var hotelPrice =  store.state.hotelPrice
                this.$ajax.get("../../../static/json/hotel/hotel.list.json")
                .then(res => {
                    var hotelList = res.data.data.list;
                    for(let i=0; i<hotelList.length; i++){
                        for(let j=0; j<hotelList[i].img.length; j++){
                            hotelList[i].img[j] = {url:"javascript:;",img:hotelList[i].img[j]}
                        }
                        this.hotel_index.push(0);
                    }
                    this.allHotel = hotelList;

                    let hotelList_Type = [];
                    let hotelList_Price = [];
                    hotelPrice = hotelPrice.split('-');
                    // 酒店类型筛选
                    for(let i=0; i<hotelList.length; i++){
                        for(let j=0; j<hotelList[i].hotelType.length; j++){

                            if(hotelPrice.length > 1){
                                if(hotelPrice[0] > hotelList[i].minprice || hotelPrice[1] < hotelList[i].minprice){
                                    break;
                                }
                            }

                            if(hotelType.indexOf(hotelList[i].hotelType[j]) >= 0 || hotelType.indexOf('不限') == 0){
                                hotelList_Type.push(hotelList[i]);
                                break;
                            }
                        }
                    }
                    this.hotelList = hotelList_Type;
                })
            },
            // 酒店搜索
            hotelSeachAction(){
                if(this.seachVal){
                    this.hotelSeach = [];
                    for(let i=0; i<this.allHotel.length; i++){
                        if(this.allHotel[i].hotelname.indexOf(this.seachVal) >= 0 ||
                           this.allHotel[i].location.indexOf(this.seachVal) >= 0){
                               this.hotelSeach.push(this.allHotel[i])
                        }
                    }
                    this.hotelList = this.hotelSeach;
                    return;
                }
                this.hotelList = this.allHotel;
            }
        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/hotel.css');
</style>


