<template>
  <div>
      <div class="container" id="seeMore">
            <div class="head">
                    <!-- 搜索景点门店 -->
                <div class="searchScenic">
                    <x-icon type="ios-arrow-left" size="30" @click="$router.push({path:'/scenics'})"></x-icon>
                    <x-input class="search"  placeholder="任何目的地 · 景点" v-model="searchVal"> </x-input>
                    <div class="searchBtn"><i class="iconfont" v-on:click.stop="sceSearch">&#xe6dc;</i></div>
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
import store from '@/store/store.js'


export default {
    
    data(){
        return{
            scenics:[],
            scenicsData:[],
            Scrolltop:0,
            city:"",
            allScenic:[],
            scenicSearch:[],
            searchVal:null,
        }
    },
    store,
    components: {
        Scroller,
        XInput,
        XButton,
        Group,
        Cell,
        Rater
    },
    mounted(){
            this.searchVal = this.$route.query.key; 
       
            //用户筛选的景点类型数组
            let result = store.state.scenicList;

       
        axios.get('../../../static/json/scenic/scenics.json').then(res =>{
             
            //用户点击查看更多
            var city = [];
            for(var i=0; i<res.data.data.length; i++){
               city.push(res.data.data[i].city)
            }
            
            var index = city.indexOf(this.$route.query.id)
           
            //查看需要的城市的所有景点
            if(index >= 0 ){
                
                this.scenicsData = res.data.data[index].scenics
                console.log(this.scenicsData[0])
            }
            
        
            //用户筛选功能
            this.allScenic = res.data.data;
            for(var i=0; i<this.allScenic.length; i++){
                for(var j=0; j<this.allScenic[i].scenics.length; j++){
                    if(result.indexOf(this.allScenic[i].scenics[j].type) >= 0 || result.indexOf('不限') == 0)
                   
                    this.scenicsData.push(this.allScenic[i].scenics[j]);
                }
            }
            
           this.sceSearch();
          

          
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
       
       sceSearch(){
         
           //用户搜索

            if(this.searchVal){
           this.scenicsData = [];
              
                for(let i=0; i<this.allScenic.length; i++){
                    for(let j=0; j<this.allScenic[i].scenics.length; j++){
                            
                        if(this.allScenic[i].scenics[j].city.indexOf(this.searchVal) >= 0 ||
                        this.allScenic[i].scenics[j].name.indexOf(this.searchVal) >= 0){
                            // console.log(this.allScenic[i])
                            this.scenicsData.push(this.allScenic[i].scenics[j])
                        }

                    }
                    
                }
               this.$router.push({path:'/seeMore',query:{key:this.searchVal}}) 
            }
       }
    }
}

</script>
<style>

.scenic-show{
    width: 100%;
    
}
.each-scenic{
    width: 48%;
    display: inline-block;
    padding-bottom: 15px;
}
.each-scenic:nth-of-type(odd){
    margin-right:12px;
    
}
#seeMore .mianer{
    padding-top:8.5rem;
    margin:0 10px;
}
</style>
