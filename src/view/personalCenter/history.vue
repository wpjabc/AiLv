<template>
        <div >
            <div class="inform-header">
               <span @click="$router.push({path:'/personpage'})"> <i class="iconfont">&#xe617;</i> </span>
               
            </div>
            <div>
              <p class="history-title">历史订单</p>
              <group-title class="wishlist-groupTitle">
                  <router-link to="/LoveHote.1/1"><span v-on:click="wishlistHote" v-bind:class="{wishlist_color: classHote}">房源</span></router-link>
                  <router-link to="/Experience.1/2" ><span v-on:click="wishlistExpr" v-bind:class="{wishlist_color: classExpr}">体验</span></router-link>
                  <router-link to="/historyRailway/3" ><span v-on:click="wishlistRailwaay" v-bind:class="{wishlist_color: classRailwaay}">火车票</span></router-link>
                  <div class="line" ref="abc"></div>
              </group-title>
              <div>
                  <router-view />
              </div>
            </div>
     
        </div>
</template>

<script>
   import { Panel,XHeader,GroupTitle } from 'vux'
   
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
        classExpr:true,
        classRailwaay:true,
        classHote:'',
        click:0,
       }
     },

      //初始化
  mounted(){
    this.routerView(this.$route.path);
  },
  //存放封装函数
  methods:{
    wishlistHote(){
      this.classHote=false;
      this.classExpr=true;
      this.classRailwaay=true;
      this.$refs.abc.style.left='0px';
      this.$refs.abc.style.width='28px';
    },
    wishlistExpr(){
        this.classHote=true;
        this.classExpr=false;
        this.classRailwaay=true;
        this.$refs.abc.style.left='42px';
        this.$refs.abc.style.width='28px';
    },
    wishlistRailwaay(){
        this.classHote=true;
        this.classExpr=true;
        this.classRailwaay=false;
        this.$refs.abc.style.left='84px';
        this.$refs.abc.style.width='42px';
    },
    //判断刷新的路由地址
    routerView(url){
      console.log(url)
      if(url=="/Experience.1/2"){
        this.wishlistExpr()
      }
      if(url=='/lovehote.1/1'){
        this.wishlistHote()
      }
      if(url=='/historyRailway/3'){
        this.wishlistRailwaay()
      }
    },
   
   
  }
   }
</script>
<style>
  .history-title{
    font-size: 1.5rem;
    font-weight: 600;
    color:black;
    margin-left: 20px;
  }
  .history-warn{
    vertical-align: super;
    right: -180px;
  }
</style>

