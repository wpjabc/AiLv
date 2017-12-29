<template>
    <div v-bind:class="{ wishlist_hidden: classHote }">
      <group-title class="wishlist-main-title"><span>{{DataHote.length}}个可订房源</span></group-title>

      <view-box ref="viewBox" v-for="(i,index) in DataHote" :key="index">
          <div class="wishhotel_box">
              <div class="wishlist-x-icon" @click="wishLove(index)"><i class="iconfont hotel-like">&#xe658;</i></div> 

              <div @click="$router.push({path:'/hotelDetail?hotelid='+i.hotelid+'&&showLove=false'})">
                  <group-title class="wishlist-group-img"><img style="width:100%;height:200px" v-bind:src="i.img[0].src" alt=""></group-title>
                  <group-title><h1 style="color:#313030">{{i.hotelname}}</h1></group-title>
                  <group-title><span class="lovehoutel-loaction">{{i.location}}</span></group-title>
              </div>
          </div>
      </view-box>
    </div>
</template>


<script>
import { XHeader,Grid,GridItem,GroupTitle,ViewBox,Alert  } from 'vux'
import axios from 'axios'
import store from '@/store/store.js'

export default {
  components: {XHeader,Grid,GridItem,GroupTitle,ViewBox,Alert },
  data () {
    return{
        classHote:false,
        DataHote:[],
    }
  },
  store,
  mounted(){
    this.getDataHote()
  },
  methods:{
     //请求
     getDataHote(){
        this.DataHote = store.state.wishLoveHotel;
        console.log(this.DataHote)
    },
    wishLove(index){
        for(let i=0;i<this.DataHote.length;i++){
            if(i==index){
                this.DataHote.splice(i,1);
            }
        };
    }
  }
}
</script>
<style>
  .hotel-like{
    font-size: 1.5rem;
    display: inline-block;
    color:#f3749f
  }
  .lovehoutel-loaction{
    width: 100%;
    display: block;
    color:goldenrod;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .wishhotel_box{
    position: relative
  }
  .wishList .wishlist-x-icon{
    z-index:1;
  }
</style>
