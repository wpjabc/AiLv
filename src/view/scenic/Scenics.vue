<template>
  <div>
      <div class="container" id="scenics">
            <div class="head">
                    <!-- 搜索景点门店 -->
                <div class="searchScenic">
                    <x-icon type="ios-arrow-left" size="30" @click="$router.go(-1)"></x-icon>
                    <x-input class="search" placeholder="任何目的地 · 景点" v-model="seachVal"> </x-input>
                     <div class="searchBtn"><i class="iconfont" v-on:click.stop="search">&#xe6dc;</i></div>
                </div>

                <div class="fun">

                    <span  @click="$router.push({path:'/filter-scenic'})"> <x-button mini class="filter">筛选条件</x-button></span>

                </div>

            </div>
            <div class="mianer">

                    <!-- 每个地区的景点展示 -->
                <div class="scenics" v-for="(items,i) in scenicsData">

                    <!-- 地区名称 -->
                    <div class="text">
                        <span class="city-name ">{{items.city}}</span> <span class="see-more"><span @click="$router.push({path:'/seeMore',query:{id:items.city}})">  查看全部</span><x-icon type="ios-arrow-right" size="15" class="icon-more"></x-icon></span>
                    </div>
                    
                    <!-- 景点展示列（可滑动） -->
                    <div>
                        <scroller lock-y :scrollbar-x="false">
                            <div class="scenic-list">

                                <!-- 景点的介绍 -->
                                <div class="scenic" v-for="(scenic,index) in items.scenics" v-if="index<6">
                                    <!-- 景点的图片 -->
                                    <div @click="$router.push({path:'/scenic',query:{city:scenic.city,id:scenic.scenic_id}})">
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
                                    </div>
                                </div>


                            </div>
                        </scroller>

                    </div>
                </div>
            </div>

      </div>

     <nav-footer></nav-footer>
  </div>
</template>


<script>
import { XInput, Group, XButton, Cell, Scroller,  Rater} from 'vux'
import axios from 'axios'
import navFooter from '../index/footer.vue'

export default {

    data(){
        return{
            scenics:[],
            scenicsData:[],
            Scrolltop:0,
            city:"",
            seachVal:null,
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
        axios.get('../../static/json/scenic/scenics.json').then(res =>{

            this.scenics = res.data;
            this.scenicsData = res.data.data;
            console.log(this.scenicsData)
        })
        //这是设置上下滚动的时候搜索框的动画
        window.onscroll = function(){

                var funHeight = document.getElementsByTagName('body')[0];          //这是页面滚动的高度
                var top = document.getElementsByClassName('searchScenic')[0];
                 
                 if(!top || !funHeight){return false}
                    funHeight=funHeight.scrollTop;
                    top=top.clientHeight;

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
        search(){
            this.$router.push({path:'/seeMore',query:{key:this.seachVal}})
        }
    }
}

</script>
<style>
    @import url('../../../static/css/scenic/scenics.css');
</style>

