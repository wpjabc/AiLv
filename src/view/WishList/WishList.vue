<template>
  <div class="wishList">
    <!-- tilte -->
    <header style="background:#fff" ><h1 style="color:black;text-align:center;padding:10px 0; ">心愿单</h1></header>
    <!-- main -->
    <div style="height:100%">
      <group-title class="wishlist-groupTitle">
          <router-link to="/LoveHotel/1"><span v-on:click="wishlistHote" v-bind:class="{wishlist_color: classHote}">房源</span></router-link>
          <router-link to="/Experience/2" ><span v-on:click="wishlistExpr" v-bind:class="{wishlist_color: classExpr}">体验</span></router-link>
          <div class="line" ref="abc"></div>
      </group-title>
      <!-- Luyou -->
      <div>
          <router-view/>
      </div>
    </div>
    <!-- footer -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { XHeader,Grid,GridItem,GroupTitle,ViewBox  } from 'vux'
import navFooter from '../index/footer.vue'

// import footerBt from '../components/footer'

export default {
  components:{
    XHeader,
    GridItem,
    GroupTitle,
    ViewBox,
    Grid,
    navFooter
  },
  data () {
    return {
      classExpr:true,
      classHote:'',
      click:0,
    }
    showMenus: false;

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
      this.$refs.abc.style.left='0px';
      console.log(1); 
    },
    wishlistExpr(){
        this.classHote=true;
        this.classExpr=false;
        this.$refs.abc.style.left='42px';
    },
    //判断刷新的路由地址
    routerView(url){
      console.log(url)
      if(url=="/Experience/2"){
        this.wishlistExpr()
      }
      if(url=='/LoveHote/1'){
               
        this.wishlistHote()
        
      }
    },
   
   
  }
}
</script>
<style>
  @import url('../../../static/css/wishList/WishList.css');
</style>


