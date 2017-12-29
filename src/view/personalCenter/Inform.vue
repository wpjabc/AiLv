<template>
        <div class="inform">
            <div class="inform-header">
               <span @click="$router.push({path:'/personpage'})"> <i class="iconfont">&#xe617;</i> </span>
            </div>
            <p class="Inform-title">通知</p>
            <div class="Inform_hote" v-for="(i,index) in getInformData.users" :key="index" @click="$router.push({path:'/Informconten?id='+i.id})">
                <group-title class="Inform_img">
                  <img style="width:60px;height:60px" v-bind:src="i.img" alt="i">
                </group-title>
                <div class="Inform_text">
                    <group-title><h3 style="color:#313030">{{i.name}}</h3></group-title>
                    <group-title><span class="Inform_text_span" style="color:goldenrod">{{i.content}}</span></group-title>
                    <group-title><span >{{i.time}}</span></group-title>
                </div>
            </div>
        </div>
</template>

<script>
   import { Panel,XHeader,GroupTitle } from 'vux'
   import axios from 'axios'
   export default {
     components: {
       Panel,XHeader,GroupTitle
     },
     methods: {
       onImgError (item, $event) {
         console.log(item, $event)
       }
     },
     data () {
       return {
         getInformData:{},
       }
     },
     mounted(){
       this.getInform();
     },
     methods:{
       //请求
       getInform(){
          axios.get('../../../static/json/personalCenter/Inform.json').then((res)=>{
              this.getInformData=res.data;
              console.log(this.getInformData);
          })
       }
     }
   }
</script>
<style>
  .inform .weui-panel:before{
    border: 0 none !important;
  }
  .inform  .weui-panel__hd{
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
  }
  .inform-header{
    padding:14px;
    
  }
  .inform-header>span>i{
     font-size: 2rem;
  }
  .Inform_hote{
      display: flex;
      border-bottom: 1px solid rgba(206, 206, 206, 0.527);
  };
  .Inform_img{
    flex: 1;
  };
  .Inform_text{
    flex: 6;
    margin-top:10px;
  };
  .Inform_text_span{
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .Inform-title{
    font-size: 1.5rem;
    font-weight: 600;
    color:black;
    margin-left: 20px;
    margin-bottom:20px;
  }
</style>
