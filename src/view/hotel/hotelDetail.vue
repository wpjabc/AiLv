<template>
    <div id="hotel_detail">
        <!-- 酒店图片轮播 -->
        <header>
            <div class="hotelIcon">
                <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
                <span @click="addWishLove" v-if="showLove"><i class="iconfont">&#xe622;</i></span>
                <span @click="addWishLove" v-else><i class="iconfont" style="color:#f3749f">&#xe658;</i></span>
            </div>
            <scroller lock-y scrollbar-x :bounce=false>
                <div class="box1">
                    <img class="previewer-demo-img" v-for="(item, index) in hotelInfo.img" :key="index" :src="item.src" @click="showImg(index)">
                    <div v-transfer-dom>
                    <previewer :list="list" ref="previewer" :options="options"></previewer>
                    </div>
                </div>
            </scroller>
        </header>

        <!-- 主体内容 -->
        <div class="container-deail">
            <!-- 酒店名和地址 -->
            <div class="hotelInfo">
                <p class="big strong">{{ hotelInfo.hotelname }}</p>
                <p>{{ hotelInfo.location }} <i class="iconfont" @click="goMap" style="color:#3c9bc2">&#xe741;</i></p>
                <p class="small hotelPhone">联系方式：电话<a v-bind:href="'tel://'+hotelInfo.hotelPhone">{{ hotelInfo.hotelPhone }}</a></p>
            </div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- 简介 -->
            <div class="hotelIntro">
                <p class="big">酒店介绍</p>
                <p v-bind:class="{'intro-deail-hide':readMoreFlag}">{{ hotelInfo.intro }}</p>
                <p class="readMore-deail" @click="readMore"><span>{{ readMoreTxt[0] }}</span></p>
            </div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- 便利设施 -->
            <div class="hotelEquipment">
                <p class="big">便利设施</p>
                <ul class="row" @click="goEquipment">
                    <li><i class="iconfont big-icon">&#xe608;</i></li>
                    <li><i class="iconfont big-icon">&#xe600;</i></li>
                    <li><i class="iconfont big-icon">&#xe989;</i></li>
                    <li><i class="iconfont big-icon">&#xe612;</i></li>
                    <li><x-icon type="ios-arrow-right" size="40"></x-icon></li>
                </ul>
            </div>
        </div>

        <div class="nearAttr-scroll"> 
            <!-- 推荐附近的景点 -->
            <div class="divider"></div>
            <div class="nearAttr-detail">
                <p class="big strong">附近好玩的景点</p>
                <scroller lock-y :scrollbar-x=false :bounce=false>
                    <div class="nearAttr-box">
                        <div class="nearAttr-pic" v-for="(i,index) in 3" :key="index">
                            <div>
                                <img class="nearAttr-img" src="../../../static/images/hotel/1/1.jpg" alt="">
                                <p class="strong">景点名</p>
                                <p class="normal">￥888</p>
                                <p class="small">
                                    <rater v-model="hotelInfo.score" active-color="#03764B" :font-size="10" disabled></rater>
                                    <span class="small">{{ hotelInfo.score }}/5</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </scroller>
            </div>
        </div>

        <footer class="row-deail">
            <div>
                <p class="big">￥{{ hotelInfo.minprice }}</p>
                <p>
                    <rater v-model="hotelInfo.score" active-color="#03764B" :font-size="15" disabled></rater>
                    <span class="normal">{{ hotelInfo.score }}</span><span class="small">/5分</span>
                </p>
            </div>
            <div @click="goChooseRoom">
                <x-button class="choose strong" type="warn" mini>选择酒店房间</x-button>
            </div>
        </footer>
    </div>
</template>

<script>
    import { Scroller, Previewer, TransferDom, Rater, XButton, Cell } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                hotelInfo:{},
                showLove:true,
                list: [],
                readMoreFlag:true,
                readMoreTxt:['阅读更多','收起'],
                // 顶部酒店图片点击放大的方法
                options: {
                    getThumbBoundsFn (index) {
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        let rect = thumbnail.getBoundingClientRect()
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                    }
                },
            }
        },
        directives: {
            TransferDom
        },
        store,  //使用状态管理
        components:{
            Scroller,
            Previewer,
            Rater,
            XButton,
            Cell
        },
        mounted(){
            // console.log($store.state.count);
              let hotelid = this.$route.query.hotelid;
            // 异步获取酒店信息
            this.$ajax.get("../../../static/json/hotel/hotel.detail.json")
            .then(res => {
                var hotelInfo = res.data.data[hotelid - 1];
                for(let i=0; i<hotelInfo.img.length; i++){
                    hotelInfo.img[i] = {src:hotelInfo.img[i]};
                    this.list.push(hotelInfo.img[i]);
                }
                this.hotelInfo = hotelInfo;
            })
            
            window.onscroll = function(){
                var top = document.getElementsByTagName('body')[0].scrollTop;
                var bookStyle = document.getElementsByClassName('row-deail')[0];

                if(!bookStyle){return false};
                // console.log(top);
                if(top > 250 ){

                    bookStyle.style.position = 'fixed';
                    bookStyle.style.transition = 'all 0.5s ease-in-out' ;
                }else{
                    bookStyle.style.position = 'relative';
                }
            };

        },
        methods:{
            showImg(index) {
                this.$refs.previewer.show(index)
            },
            //酒店介绍点击查看更多
            readMore(){
               this.readMoreTxt.unshift(this.readMoreTxt.pop());
               this.readMoreFlag = !this.readMoreFlag
            },
            goEquipment(){
                let staus = this.hotelInfo.equip;
                store.commit('setHotelEquipment',staus);
                this.$router.push({path:"/hotelDetail/equip"});
            },
            goMap(){
                let address = this.hotelInfo.location;
                let hotel = this.hotelInfo.hotelname;
                this.$router.push({path:"/hotelDetail/map?address="+address+"&hotel="+hotel});
            },
            goChooseRoom(){
                // console.log(this.hotelInfo.roomType)
                store.commit('setHotelRoomType',this.hotelInfo.roomType)
                this.$router.push({path:'/hotelDetail/chooseRoom?hotelid='+this.hotelInfo.hotelid})
            },
            //心愿单
            addWishLove(){
                if(this.showLove){
                    this.showLove=false;
                    store.commit('addWishLoveHotel',this.hotelInfo);
                }else{
                    this.showLove=true;
                    store.commit('delWishLoveHotel',this.hotelInfo.hotelid);
                }
            }
        }
    }
</script>
<style>
    @import url('../../../static/css/hotel/hotelDetail.css');
     .pswp{
        z-index:1000000!important;
    }
</style>


