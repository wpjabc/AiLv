<template>
  <div>
      <div class="container indexSearch" >
            <div class="head">
                    <!-- 搜索景点门店 -->
                <div class="searchScenic">
                    <x-icon type="ios-arrow-left" size="30" @click="$router.push({path:'/scenics'})"></x-icon>
                    <x-input class="search"  placeholder="任何目的地 · 景点" v-model="searchVal"> </x-input>
                    <div class="searchBtn"><i class="iconfont" v-on:click.stop="sceSearch">&#xe6dc;</i></div>
                </div>

            </div>

            <div class="null" v-if="!flag.all"><span>未找到相应酒店和景点</span></div>
            <div class="mianer">

                <div class="scenics" v-if="flag.hotel">
                    
                    <!-- 地区名称 -->


                    <div>
                        <div class="indexSearch_title"><span>酒店</span></div>
                        <div class="scenic-show">  
                            
                            <!-- 景点的介绍 -->
                            <div class="each-scenic" v-for="(hotel,i) in hotelData" :key="i">
                                <!-- 景点的图片 -->
                                <div @click="$router.push({path:'/hotelDetail?hotelid='+hotel.hotelid})"> 
                                    <div class="scenic-img">
                                        <a href="javascript:viod(0)"><img v-bind:src="hotel.img[0]" alt=""></a>
                                    </div>
                                    <!-- 景点名称 -->
                                    <div class="scenics-name">
                                        <a href="javascript:void(0)">{{hotel.hotelname}}</a>
                                    </div>
                                    <div class="scenic-price">
                                        <p>每人￥{{hotel.minprice}} </p>
                                    </div>
                                    <div class="rater">
                                        <rater v-model="hotel.score" active-color="#04BE02" :font-size="15" disabled></rater>
                                        <span class="score">{{hotel.score}}</span>
                                    </div>
                                </div>
                            </div> 
                            
                        </div>  

                    </div>
                </div>
                
                    <!-- 每个地区的景点展示 -->
                <div class="scenics" v-if="flag.sciencs">
                    
                    <!-- 地区名称 -->


                    <div>
                        <div class="indexSearch_title"><span>景点</span></div>
                        <div class="scenic-show">  
                            
                            
                            <!-- 景点的介绍 -->
                            <div class="each-scenic" v-for="(scenic,i) in sciencsData" :key="i">
                                <!-- 景点的图片 -->
                                <router-link :to="{name:'scenic',query:{city:scenic.city,id:scenic.scenic_id}}" > 
                                    <div class="scenic-img">
                                        <a href="javascript:viod(0)"><img v-bind:src="scenic.img[0]" alt=""></a>
                                    </div>
                                    <!-- 景点名称 -->
                                    <div class="scenics-name">
                                        <a href="javascript:void(0)">{{scenic.name}}</a>
                                    </div>
                                    <div class="scenic-price">
                                        <p>每人￥{{scenic.price}} </p>
                                    </div>
                                    <div class="rater">
                                        <rater v-model="scenic.score" active-color="#04BE02" :font-size="15" disabled></rater>
                                        <span class="score">{{scenic.score}}</span>
                                    </div>
                                </router-link>
                            </div> 
                            
                        </div>  

                    </div>
                </div>

            </div>
          
      </div>
       

  </div>
</template>


<script>
  import { XInput, Group, XButton, Cell, Scroller,  Rater} from 'vux'
  import axios from 'axios'
  import navFooter from './footer.vue'

  export default {

    data(){
      return{
        index:[],
        sciencsData:[],
        hotelData:[],
        hotData:[],
        Scrolltop:0,
        flag:{
          sciencs:false,
          hotel:false,
          all:false
        },
        city:"",
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        }
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
      let search_val = this.$route.query.val;
      axios.get('../../../static/json/scenic/scenics.json').then(res =>{
        var arr = [];
        for(var i=0;i<res.data.data.length;i++){
            for(var j=0;j<res.data.data[i].scenics.length;j++){
              if(res.data.data[i].scenics[j].address.indexOf(search_val) != -1){
                  arr.push(res.data.data[i].scenics[j]);
              }else if(res.data.data[i].scenics[j].city.indexOf(search_val) != -1){
                arr.push(res.data.data[i].scenics[j]);
              }else if(res.data.data[i].scenics[j].name.indexOf(search_val) != -1){
                arr.push(res.data.data[i].scenics[j]);
              }
            }
        }
    
        arr.length>0?this.flag.sciencs = true: arr = arr;
        this.sciencsData = arr;
      })

      axios.get('../../../static/json/hotel/hotel.list.json').then(res=>{
        var arr = [];
        console.log(res.data.data)
        for(var i=0;i<res.data.data.list.length;i++){
            if(res.data.data.list[i].hotelname.indexOf(search_val) != -1){
                arr.push(res.data.data.list[i]);
            }else if(res.data.data.list[i].location.indexOf(search_val) != -1){
              arr.push(res.data.data.list[i]);
            }
            if(arr.length == 6){
                break;
            }
        }
        arr.length>0?this.flag.hotel = true: arr = arr;
        if(this.flag.hotel == true || this.flag.sciencs == true){
          this.flag.all = true;
          console.log(1111111111)
        }
        // (this.flag.hotel == true) && (this.flag.sciencs == true) ? this.flag.all = true : this.flag.all = false;
        this.hotelData = arr;
      })


              
      
      //这是设置上下滚动的时候搜索框的动画
      window.onscroll = function(){

        var funHeight = document.getElementsByTagName('body')[0].scrollTop;          //这是页面滚动的高度
        var top = document.getElementsByClassName('searchScenic')[0].clientHeight;

        if( funHeight < this.Scrolltop){

          document.getElementsByClassName('head')[0].style.height = "5em";
          document.getElementsByClassName('head')[0].style.transition = "0.5s";
        }else  if(funHeight > top){
          document.getElementsByClassName('head')[0].style.position = "fixed";
          document.getElementsByClassName('head')[0].style.height = "5em";

        }
        if(funHeight == 0){
          document.getElementsByClassName('head')[0].style.boxShadow = "none"
        }else{
          document.getElementsByClassName('head')[0].style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)"
        }
        this.Scrolltop  = funHeight;
      }
    },
    methods:{
      skip_scenics(){
        this.$router.push({path:'/scenics'});
      },

      // search(){
      //   var search = document.getElementsByClassName('weui-input')[0].value;
      //   var mySearch = [];
      //   console.log(search);
      //   axios.get('../static/json/index.json').then(res =>{
      //     for(var i=0;i<res.data.data.length;i++) {
      //       for (var j = 0; j < res.data.data[i].scenic.length; j++) {
      //         console.log(res.data.data[i].scenic[j].name.indexOf(search))
      //         res.data.data[i].scenic[j].name.indexOf(search)>-1 ? mySearch.push(res.data.data[i].scenic[j]) : j=j;
      //       }
      //     }
      //     console.log(mySearch)
      //   })
      // }
    }
  }

</script>
<style>
  @import url('../../../static/css/index/IndexSearch.css');
</style>


