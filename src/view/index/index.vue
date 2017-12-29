<template>
  <div>
      <div class="container" id="index">
            <div class="head">
                <!-- <div @click="abc">dhkjashdksja</div> -->
                    <!-- 搜索景点门店 -->
                <div class="searchScenic">
                    <x-icon type="ios-arrow-left" size="30"></x-icon>
                    <x-input class="search" placeholder='请尝试"广州"' v-model="search_val"></x-input>
                    <div class="searchBtn"><i class="iconfont" v-on:click.stop="search">&#xe6dc;</i></div>
                </div>

                <!-- <div class="fun">

                    <x-button mini class="filter">所有日期</x-button>
                    <x-button mini class="filter">房客</x-button>

                </div> -->

            </div>
            <!--选择房源和景点-->
            <div class="index-nav">
              <div class="index-nav-content">
                <!--标题-->
                <div class="text">
                  <div class="city-name">探索爱旅</div>
                </div>
                <div class="houseScene">
                  <div class="houseScene-frame" @click="$router.push({path:'/hotel'})">
                    <div class="houseScene-pic"><img src="http://himg1.qunarzz.com/imgs/201612/06/JhS1_tb0bzCrTgc1J120.jpg" alt=""></div>
                    <div class="houseScene-title sa"><span>房源</span></div>
                  </div>
                  <div class="houseScene-frame" @click="$router.push({path:'/scenics'})">
                    <div class="houseScene-pic"><img src="https://imgs.qunarzz.com/p/tts1/1708/19/fd1b8ca2fff54d02.jpg_r_390x260x90_4da8e873.jpg" alt=""></div>
                    <div class="houseScene-title"><span>景点</span></div>
                  </div>
                  <div class="houseScene-frame" @click="$router.push({path:'/chooseStation'})">
                    <div class="houseScene-pic"><img src="../../../static/images/b7e146f90bac1a52513633b63058fa034cc981a82fe98-mT2lM7_fw658.jpg" alt=""></div>
                    <div class="houseScene-title"><span>火车票</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mianer">

                    <!-- 酒店列表 -->
                <div class="scenics" >

                    <!-- 地区名称 -->
                    <div class="text">
                        <span class="city-name ">酒店</span> <span class="see-more"><span @click='$router.push({path:"/hotel"})'> 查看全部</span><x-icon type="ios-arrow-right" size="15" class="icon-more"></x-icon></span>
                    </div>

                    <!-- 景点展示列（可滑动） -->

                    <div>
                  <scroller lock-y :scrollbar-x="false">
                    <div class="scenic-list">

                      <!-- 景点的介绍 -->
                      <div class="scenic" v-for="scenic in hotelData" @click="$router.push({path:'hotelDetail?hotelid='+scenic.hotelid})">
                        <!-- 景点的图片 -->

                        <div class="scenic-img">
                          <a href="javascript:viod(0)"><img v-bind:src="scenic.img[0]" alt=""></a>
                        </div>
                        <!-- 景点名称 -->
                        <div class="scenic-name">
                          <a href="javascript:void(0)">{{scenic.hotelname}}</a>
                        </div>
                        <div class="scenic-price" v-if="scenic.minprice">
                          <p>每人￥{{scenic.minprice}} </p>
                        </div>
                        <div class="rater" v-if="scenic.score">
                          <rater v-model="scenic.score" active-color="#04BE02" :font-size="15" disabled></rater>
                          <span class="score">{{scenic.score}}</span>
                        </div>
                      </div>


                    </div>
                  </scroller>

                </div>
                    
                </div>
                <div class="scenics" >

                <!-- 景点列表 -->
                <div class="text">
                  <span class="city-name ">景点</span> <span class="see-more"><span @click='$router.push({path:"/scenics"})'> 查看全部</span><x-icon type="ios-arrow-right" size="15" class="icon-more"></x-icon></span>
                </div>
                <!-- <p>{{items.scenic}}</p> -->
                <!-- v-for="(scenic,index) in items" -->
                <!-- 景点展示列（可滑动） -->
                <div>
                        <scroller lock-y :scrollbar-x="false">
                            <div class="scenic-list">

                                <!-- 景点的介绍 -->
                                <div class="scenic" v-for="scenic in sciencsData" @click="$router.push({path:'/scenic',query:{city:scenic.city,id:scenic.scenic_id}})">
                                    <!-- 景点的图片 -->
                                    <div class="scenic-img">
                                        <a href="javascript:viod(0)"><img v-bind:src="scenic.img[0]" alt=""></a>
                                    </div>
                                    <!-- 景点名称 -->
                                    <div class="scenic-name">
                                        <a href="javascript:void(0)">{{scenic.name}}</a>
                                    </div>
                                    <div class="scenic-price" v-if="scenic.price">
                                        <p>每人{{scenic.price}} </p>
                                    </div>
                                    <div class="rater" v-if="scenic.score">
                                        <rater v-model="scenic.score" active-color="#04BE02" :font-size="15" disabled></rater>
                                        <span class="score">{{scenic.score}}</span>
                                    </div>
                                </div>


                            </div>
                        </scroller>

                    </div>

                
              </div>
                <div class="scenics" >

                <!-- 地区名称 -->
                <div class="text">
                  <span class="city-name ">热门地方</span> <span class="see-more"><span > 查看全部</span><x-icon type="ios-arrow-right" size="15" class="icon-more"></x-icon></span>
                </div>
                <!-- <p>{{items.scenic}}</p> -->
                <!-- v-for="(scenic,index) in items" -->
                <!-- 景点展示列（可滑动） -->
                <div>
                  <scroller lock-y :scrollbar-x="false">
                    <div class="scenic-list">

                      <!-- 景点的介绍 -->
                      <div class="scenic" v-for="(scenic,index) in sciencsData" v-if="index<3" @click="$router.push({path:'/scenic',query:{city:scenic.city,id:scenic.scenic_id}})">
                        <!-- 景点的图片 -->

                        <div class="scenic-img">
                          <a href="javascript:viod(0)"><img v-bind:src="scenic.img[0]" alt=""></a>
                        </div>
                        <!-- 景点名称 -->
                        <div class="scenic-name">
                          <a href="javascript:void(0)">{{scenic.name}}</a>
                        </div>
                        <div class="scenic-price" v-if="scenic.price">
                          <p>每人{{scenic.price}} </p>
                        </div>
                        <div class="rater" v-if="scenic.score">
                          <rater v-model="scenic.score" active-color="#04BE02" :font-size="15" disabled></rater>
                          <span class="score">{{scenic.score}}</span>
                        </div>
                      </div>
                      <div class="scenic" v-for="(scenic,index) in hotelData" v-if="index<3" @click="$router.push({path:'hotelDetail?hotelid='+scenic.hotelid})">
                        <!-- 景点的图片 -->

                        <div class="scenic-img">
                          <a href="javascript:viod(0)"><img v-bind:src="scenic.img[0]" alt=""></a>
                        </div>
                        <!-- 景点名称 -->
                        <div class="scenic-name">
                          <a href="javascript:void(0)">{{scenic.hotelname}}</a>
                        </div>
                        <div class="scenic-price" v-if="scenic.minprice">
                          <p>每人{{scenic.minprice}} </p>
                        </div>
                        <div class="rater" v-if="scenic.score">
                          <rater v-model="scenic.score" active-color="#04BE02" :font-size="15" disabled></rater>
                          <span class="score">{{scenic.score}}</span>
                        </div>
                      </div>

                    </div>
                  </scroller>

                </div>
              </div>

            </div>
            <nav-footer></nav-footer>
      </div>


  </div>
</template>


<script>
import { XInput, Group, XButton, Cell, Scroller,  Rater, cookie} from 'vux'
import axios from 'axios'
import navFooter from './footer.vue'
import store from '@/store/store.js'

export default {

    data(){
        return{
            index:[],
            sciencsData:[],
            hotelData:[],
            hotData:[],
            Scrolltop:0,
            city:"",
            search_val:"",
        }
    },
    components: {
        Scroller,
        XInput,
        XButton,
        Group,
        Cell,
        Rater,
        navFooter
    },
    mounted(){
        // 通过cookie获取上一次登录id-时间戳
          const timeID =cookie.get('time');   
        
        if(!timeID){
            this.$router.push({path:'/memeber'})
        }else{
            //获取当前时间
          var date = new Date;
          const times = date.getTime();
          var timeArr = [];

          var timeArr = timeID.split('-');
          var loginTime = timeArr[2];
          store.state.userInfo.name = timeArr[1];
         store.state.userInfo.id = timeArr[0];
          //距离上次登录超过五分钟
            if(  times - loginTime >300000000000000 ){

              console.log(loginTime)
              this.$router.push({path:'/member'})
            }
        }



        axios.get('../../../static/json/scenic/scenics.json').then(res =>{
          console.log(res)
            var arr = [];
            for(var i=0;i<3;i++){
              for(var j=0;j<2;j++){
                  arr.push(res.data.data[i].scenics[j]);
              }
            }
            this.sciencsData = arr;
        })

        axios.get('../../../static/json/hotel/hotel.list.json').then(res=>{
            var arr = [];
            console.log(res.data.data.list);
            for(var i=0;i<6;i++){
                arr.push(res.data.data.list[i]);
            }
            console.log(arr);
            this.hotelData = arr;
        })
        //这是设置上下滚动的时候搜索框的动画
        window.onscroll = function(){

                var funHeight = document.getElementsByTagName('body')[0]          //这是页面滚动的高度
                var top = document.getElementsByClassName('searchScenic')[0]


                if(!top || !funHeight){return false};

                funHeight = funHeight.scrollTop;
                top = top.clientHeight;
                if( funHeight < this.Scrolltop){

                    // document.getElementsByClassName('fun')[0].style.paddingTop = "5em";
                    // document.getElementsByClassName('fun')[0].style.transition = "0.5s";
                    document.getElementsByClassName('head')[0].style.height = "5em";
                     document.getElementsByClassName('head')[0].style.transition = "0.5s";
                }else  if(funHeight > top){
                    document.getElementsByClassName('head')[0].style.position = "fixed";
                    document.getElementsByClassName('head')[0].style.height = "5em";
                    // document.getElementsByClassName('fun')[0].style.position = "fixed";
                    // document.getElementsByClassName('fun')[0].style.paddingTop = "1em";
                }
                if(funHeight == 0){
                    document.getElementsByClassName('head')[0].style.boxShadow = "none"
                }else{
                    document.getElementsByClassName('head')[0].style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)"
                }
                this.Scrolltop  = funHeight;
            }
        if(store.state.get){
        store.commit('getHistoryData');
        store.commit('getScenicData');
        store.state.get=false;
      }
    },
    methods:{
      // abc(){
      //   var date = new Date;
      //   // var timeArr = [];
      //   const times = date.getTime(); 
      //   var id = 1;
      //   cookie.set('time',id+'-'+times);
        
      // },

      search(){
          // console.log(cookie.get('time'))  
          
          this.$router.push({path:"/indexSearch",query:{val:this.search_val}})
      }
    }
}

</script>
<style>
    @import url('../../../static/css/scenic/scenics.css');

#index .mianer{
    padding-top:2em; 

}
.scenic-name>a{
  color:black;
}
#index .head{
   width: 100%;
    background-color:#fff;
    position: fixed;
    z-index: 5;
    height: 5em;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>

