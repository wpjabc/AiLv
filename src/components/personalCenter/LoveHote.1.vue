<template>
    <div v-bind:class="{ wishlist_hidden: classHote }">
      <group-title class="wishlist-main-title">
        <span>{{DataHote.length}}个可订房源</span>
        <x-button class="history-warn" mini type="warn" @click.native="historyHotelDelete">{{deleteText}}</x-button>
      </group-title>

      <div class="history-content" v-for="(i,index) in DataHote" :key="index"  @click="historyRoter(i)">
          <div class="history_delete" v-if="deleteShow" @click="HotelDelete(index)"><i class="iconfont history_delete_icon">&#xe617;</i></div>
          <view-box class="history_hote" >
            <group-title class="wishlist-group-img history_hote_img">
              <img style="width:60px;height:60px" v-bind:src="i.img[0]" alt="">
            </group-title>
            <div class="history_hote_text">
              <group-title><h3 style="color:#313030">{{i.hotelname}}</h3></group-title>
              <group-title><span class="LoveHotel-content">{{i.location}}</span></group-title>
              <group-title><span >{{i.time}}</span></group-title>
            </div>
          </view-box>
      </div>
    </div>
</template>

<script>
import { XHeader,XButton ,GridItem,GroupTitle,ViewBox,  } from 'vux'
import axios from 'axios'
import store from '@/store/store.js'

export default {
  components: {XHeader,XButton,GridItem,GroupTitle,ViewBox },
  data () {
    return{
        classHote:false,
        DataHote:[],
        historyRouter:true,
        deleteShow:false,
        deleteID:null,
        deleteText:'删除',
    }
  },
  store,
  mounted(){
    this.getDataHote();
  },
  methods:{
     //请求
     getDataHote(){
        this.DataHote  = store.state.HistoryDataHotel
    },
    historyRoter(i){
      if(this.historyRouter){
        this.$router.push({path:'/hotelDetail?hotelid='+i.hotelid})
      }
    },
    historyHotelDelete(){
      if(this.deleteText=='取消'){
        this.historyRouter=true;
        this.deleteShow=false;
        this.deleteText='删除';
      }else{
        this.historyRouter=false;
        this.deleteShow=true;
        this.deleteText='取消';
      }
    },
    HotelDelete(i){
      console.log(i)
      this.DataHote.splice(i,1);
    },
    
  }
}
</script>

<style>
.history_hote .weui-tab__panel{
      display: flex;
  }
  .weui-tab__panel{
    padding:0;
    border-bottom:1px solid rgba(206, 206, 206, 0.527);
  }
  .history_hote_img{
    flex: 1;
  }
  .history_hote_text{
    flex: 6;
    margin-top:10px;
  }
  .history_hote_text .weui-cells__title{
    margin: 0px;
  }
  .LoveHotel-content{
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color:goldenrod;
  }
  .history-content{
    display: flex;
  }
  .history_delete{
    margin-left:5px;
    line-height: 70px;
    text-align: center;
  }
  .history_delete_icon {
    flex: 1;
    background-color: #E64340;
    color: #fff;
    font-size: 25px;
    border-radius: 20px;
  }
</style>