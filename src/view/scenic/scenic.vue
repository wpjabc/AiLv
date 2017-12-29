<template>
    <div class="all" id="scenic">
        <!-- 头部返回按钮与收藏按钮 -->
        <header class="scenic-header">
            <div class="nav">
                <span @click="$router.go(-1)"><i class="iconfont">&#xe60a;</i></span>
                <span  @click="addWishLoveScenic" v-if="iconCode"><i class="iconfont collection" > &#xe622;</i></span>
                <span  @click="addWishLoveScenic" v-else><i class="iconfont uncollection"  >&#xe658;</i></span>
                <!-- <i class="iconfont collection" ></i> -->
            </div>
        </header>

        <!-- 景点图片滑动图 -->
        <div class="scenic-swiper ">
            <swiper :aspect-ratio="1000/800" :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange" ></swiper>
        </div>
        <!-- 景点详细说明，注意事项等 -->
        <div class="scenic-detail">

            <!-- 景点的名称与简单介绍 -->
            <div class="scenic-name">
                <div class="name">
                    <p>{{scenic.name}}</p>
                    <span class="map" @click="setaddress(scenic.address)"><i class="iconfont icon-map" >&#xe741;</i></span>
                </div>
                <div class="description">
                    <p class="intro">{{scenic.introduction}}</p>
                    <p class="address">地址：{{scenic.address}}</p>
                    
                </div>
            </div>

            <!-- 景点的看点与开放时间 -->

            <div class="Watch">
                <div class="watch-focus">
                    <p class="content">景点内容</p>
                    <p v-bind:class="{'focus':click,'focus-more':(!click)}">
                        {{scenic.content}}
                    </p>
                    <p class="read-more"><span  @click="more">{{text}}</span></p>
                </div>
            </div>
            <div class="open">
                <div class="open-time">
                    <p class="content">开放时间:</p>
                    <p class="time" v-for="time in scenic.open_time">{{time}}</p>
                    
                </div>
            </div>

            <!-- 景点特惠政策 -->
            <div class="policy" v-if="scenic.preferential_policies">

                <div class="scenic-policy" >
                    <p class="content">特惠政策</p>
                    <p class="policy-content" >{{scenic.preferential_policies}}</p>
                </div>
            </div>

            <!-- 景点小贴士 -->
            <div class="tips">
                <div class="scenic-tips">
                    <p class="content">小贴士</p>
                    <p>
                        <ul>
                            <li class="small-tips" v-for="tip in scenic.tips"><i class="iconfont tips-icon" >&#xe602;</i>{{tip}}</li>
                        </ul>
                    </p>
                </div>
            </div>


        </div>
        <!-- 附近的酒店推荐 -->
            <div class="nearby-hotel">
                <p class="content ">附近酒店</p>

                <div class="hotel-nearby-list">
                    <scroller lock-y :scrollbar-x="false">
                        <div class="hotel-nearby">
                            <div class="hotel-dec">
                                <div class="nearby-hotel-img">
                                    <img src="//img1.qunarzz.com/tuan/team2/1710/fc/bd50a5254fb14302.jpg" alt="">
                                </div>
                                <div class="nearby-hotel-detail">
                                    <p class="nearby-hotel-name">Q+广州嘻哈亲子主题度假酒店公寓长隆北门店</p>
                                    <p class="nearby-hotel-price">￥139</p>
                                    <p class="nearby-hotel-score"><rater v-model="rate" active-color="#04BE02" disabled :font-size="13"></rater>3.9</p>
                                </div>
                            </div>
                            <div class="hotel-dec">
                                <div class="nearby-hotel-img">
                                    <img src="//img1.qunarzz.com/tuan/team2/1710/fc/bd50a5254fb14302.jpg" alt="">
                                </div>
                                <div class="nearby-hotel-detail">
                                    <p class="nearby-hotel-name">Q+广州嘻哈亲子主题度假酒店公寓长隆北门店</p>
                                    <p class="nearby-hotel-price">￥139</p>
                                    <p class="nearby-hotel-score"><rater v-model="rate" active-color="#04BE02" disabled :font-size="13"></rater>3.9</p>
                                </div>
                            </div>
                            <div class="hotel-dec">
                                <div class="nearby-hotel-img">
                                    <img src="//img1.qunarzz.com/tuan/team2/1710/fc/bd50a5254fb14302.jpg" alt="">
                                </div>
                                <div class="nearby-hotel-detail">
                                    <p class="nearby-hotel-name">Q+广州嘻哈亲子主题度假酒店公寓长隆北门店</p>
                                    <p class="nearby-hotel-price">￥139</p>
                                    <p class="nearby-hotel-score"><rater v-model="rate" active-color="#04BE02" disabled :font-size="13"></rater>3.9</p>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="hotel-nearby">

                        </div> -->
                    </scroller>

                </div>
            </div>


        <!-- 尾部固定门票预订 -->

        <footer class="scenic-footer">
            <div class="ticket-book">
                <div class="book">
                    <div class="ticket-price">
                        <p> <span class="price-up">￥{{scenic.price}} <span class="up">起</span></span> <span class="each-people">每人</span></p>
                         <rater v-model="rate" active-color="#04BE02" disabled :font-size="15"></rater>
                        <span class="score">{{rate}}</span>
                    </div>
                    <div class="booking-btn">
                        <div @click="$router.push({path:'/ticketType',query:{city:scenic.city,id:scenic.scenic_id}})">
                            <button class="check-ticket"  >查看票型</button>
                        </div>

                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>
<script>
    import { Swiper, SwiperItem, Divider, Cell, Rater, Scroller} from 'vux'
    import axios from 'axios'
    import store from '@/store/store.js'


export default {

    components:{
        Swiper,
        SwiperItem,
        Divider,
        Cell,
        Rater,
        Scroller
    },
    store,
    data(){
        return{
            demo01_list:[],
            demo01_index: 0,
            click:true,
            text: "阅读更多",
            rate:4.9,
            showContent004: false,
            address:'',
            iconCode:true,
            scenic:{},
            
        }   
    },
    mounted(){
        var city = this.$route.query.city;
        var id = this.$route.query.id;
        axios.get('../../static/json/scenic/scenics.json').then(res =>{
            for(var i=0; i<res.data.data.length;i++){
               //获取数据中城市的下标志、值
               if(res.data.data[i].city == city){
                   //获取到城市后再循环所有景点
                  for(var j=0; j<res.data.data[i].scenics.length;j++){
                    //   判断景点的id值
                      if(res.data.data[i].scenics[j].scenic_id ==id){
                          
                          this.scenic = res.data.data[i].scenics[j];
                          for(let a=0; a<res.data.data[i].scenics[j].img.length;a++){
                              this.demo01_list .push({url:"javascipt:;",img:res.data.data[i].scenics[j].img[a]} );
                          }
                          
                          console.log(typeof (this.scenic.preferential_policies))
                      }
                  }
                }
            }
          
        })
        // console.log(this.$route.query.id)
        
            window.onscroll = function(){
                var top = document.getElementsByTagName('body')[0].scrollTop;
                var bookStyle = document.getElementsByClassName('ticket-book')[0];

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
        demo01_onIndexChange (index) {
            this.demo01_index = index
        },
        more(){
            if(!this.click){
                this.click = true;
                this. text = "阅读更多";
            }else{
                this.click = false;
                this.text = "收起"
            }
        },

        setaddress(address){
            // console.log(v.state)
           store.commit('setaddress',address);
           this.$router.push({path:'/map'});
        },

        //心愿单
        addWishLoveScenic(){
            if(this.iconCode){
                this.iconCode=false;
                store.commit('addWishLoveScenic',this.scenic);
            }else{
                this.iconCode=true;
                store.commit('delWishLoveScenic',this.scenic.scenic_id);
            }
        }

    }
}
</script>


<style>
    @import url('../../../static/css/scenic/scenic.css');
</style>
