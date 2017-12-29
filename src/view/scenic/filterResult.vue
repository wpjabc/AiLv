<template>
  <div>
      <div class="container" id="filterResult">
            <div class="head">
                    <!-- 搜索景点门店 -->
                <div class="searchScenic">
                    <x-icon type="ios-arrow-left" size="30"></x-icon>
                    <x-input class="search" :is-type="be2333" placeholder="任何目的地 · 景点" > </x-input>
                </div>

                <div class="fun">
                    
                   <span @click="$router.push({path:'/filter-scenic'})"><x-button mini class="filter">筛选条件</x-button></span> 
                    
                </div>

            </div>
            <div class="mianer">
                
                    <!-- 每个地区的景点展示 -->
                <div class="scenics" >
                    
                    <!-- 地区名称 -->


                    <div>
                        <div class="scenic-show">  
                            
                            <!-- 景点的介绍 -->
                            <div class="each-scenic" v-for="(scenic,i) in scenicsData" :key="i">
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


export default {
    
    data(){
        return{
            scenics:[],
            scenicsData:[],
            Scrolltop:0,
            city:"",
            result:[],
        }
    },
    components: {
        Scroller,
        XInput,
        XButton,
        Group,
        Cell,
        Rater
    },
    mounted(){
      
        axios.get('../../../static/json/scenics.json').then(res =>{

            var city = [];
            for(var i=0; i<res.data.data.length; i++){
               city.push(res.data.data[i].city)
            }
            
            var index = city.indexOf(this.$route.query.id)

            this.scenicsData = res.data.data[index].scenics
            console.log(this.scenicsData)
        })
        //这是设置上下滚动的时候搜索框的动画
        window.onscroll = function(){
                 
                var funHeight = document.getElementsByTagName('body')[0].scrollTop;          //这是页面滚动的高度
                var top = document.getElementsByClassName('searchScenic')[0].clientHeight;
                
                if( funHeight < this.Scrolltop){
                    
                    document.getElementsByClassName('fun')[0].style.paddingTop = "5em";
                    document.getElementsByClassName('fun')[0].style.transition = "0.5s";
                    document.getElementsByClassName('head')[0].style.height = "8em";
                     document.getElementsByClassName('head')[0].style.transition = "0.5s";
                }else  if(funHeight > top){
                    document.getElementsByClassName('head')[0].style.position = "fixed";
                    document.getElementsByClassName('head')[0].style.height = "5em";
                    document.getElementsByClassName('fun')[0].style.position = "fixed";
                    document.getElementsByClassName('fun')[0].style.paddingTop = "2em";
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
       
    }
}

</script>
<style>
    /* @import url('../assets/css/scenics.css'); */
.scenic-show{
    width: 100%;
    
}
#filterResult .each-scenic{
    width: 48%;
    display: inline-block;
    
}
#filterResult  .each-scenic:nth-of-type(odd){
    margin-right:10px;
}
</style>
