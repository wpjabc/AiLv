<template>
    <div  v-bind:class="{ wishlist_hidden: classExpr }">
        <group-title class="wishlist-main-title"><span>{{Dataexprience.length}}个可订体验</span></group-title>

        <view-box ref="viewBox" v-for="(i,index) in Dataexprience" :key="index">
            <div class="wishhotel_box">
                <div class="wishlist-x-icon" @click="wishLove(index)"><i class="iconfont expr-like">&#xe658;</i></div>              
                <router-link :to="{name:'scenic',query:{city : i.city , id : i.scenic_id}}">
                    <group-title class="wishlist-group-img"><img style="width:100%;height:200px" v-bind:src="i.img[0]" alt="i"></group-title>
                    <group-title><h1 style="color:#313030">{{i.name}}</h1></group-title>
                    <group-title class=""><span style="color:goldenrod">{{i.address}}</span></group-title>
                </router-link>
            </div>
        </view-box>
      </div>
</template>

<script>
import { XHeader,Grid,GridItem,GroupTitle,ViewBox  } from 'vux'
import axios from 'axios'
import store from '@/store/store.js'

export default {
  components: {XHeader,Grid,GridItem,GroupTitle,ViewBox },
  data () {
    return{
      classExpr:false,
      Dataexprience:[],
    }
  },
  store,
  mounted(){
    this.getDataexprience()
  },
  methods:{
     //请求
     getDataexprience(){
        this.Dataexprience = store.state.wishLoveScenic;
        console.log(this.Dataexprience)
    },
    wishLove(index){
        for(let i=0;i<this.Dataexprience.length;i++){
            if(i==index){
                this.Dataexprience.splice(i,1);
            }
        };
    }
  }
}
</script>


<style>
    .expr-like{
        font-size: 1.5rem;
        display: inline-block;
        color:#f3749f
    }
</style>
