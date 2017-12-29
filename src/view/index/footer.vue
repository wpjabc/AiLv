<template>
    <!-- <footer>
      <div class="paddingBottom"></div>

      <div class="footer">
        <ul class="footer-nav">
          <li @click="skip_index"><i class="iconfont">&#xe6dc;</i><span>浏览</span></li>
          <li @click="skip_wishList"><i class="iconfont">&#xe622;</i><span>心愿单</span></li>
          <li @click="skip_Inbox"><i class="iconfont">&#xe60d;</i><span>收件箱</span></li>
          <li @click="skip_personPage"><i class="iconfont">&#xe625;</i><span>我的</span></li>
      </div>
    </footer> -->
    <div class="footer">
      <ul class="footer_menu_lists" id="footerMenuList">
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_home" to="/home">浏览</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_lovehotel" to="/lovehotel">心愿单</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_Inbox" to="/Inbox">收件箱</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_personpage" to="/personpage">我的</router-link>
        </li>
      </ul>
      <div class="footer_blank"></div>
    </div>
    
</template>

<style>
  @import url('../../../static/css/index/footer.css');
</style>

<script>
    import store from '../../store/store.js'
    export default{
        data () {
            return {
                current_frame:0,
            }
        },
        store,
        computed:{
          footer(){
              return store.state.foot_nav;
          }
        },
        mounted:function () {
            // this.onload();
        },
        methods:{
          // onload(){
          //   var footer_nav = document.getElementsByClassName('footer-nav')[0].getElementsByTagName('li');
          //   footer_nav[store.state.foot_nav].style.color = 'red';
          // },
          // //跳转到首页事件
          // skip_index(){
          //   store.commit("updateFooterNav",0);
          //   this.$router.push({path:'/'});
          // },

          // //跳转到心愿单页面事件
          // skip_wishList(){
          //   var footer_nav = document.getElementsByClassName('footer-nav')[0].getElementsByTagName('li');
          //   for(var i=0;i<footer_nav.length;i++){
          //     footer_nav[i].style.color = 'black';
          //   }
          //   footer_nav[1].style.color = 'red';
          //   store.commit("updateFooterNav",1);
          //   this.$router.push({path:'/lovehotel'});
          // },

          // //跳转到收件箱页面事件
          // skip_Inbox(){
          //   var footer_nav = document.getElementsByClassName('footer-nav')[0].getElementsByTagName('li');
          //   this.current_frame = 2;
          //   if(footer_nav[2] != 'red'){
          //     for(var i=0;i<footer_nav.length;i++){
          //       footer_nav[i].style.color = 'black';
          //     }
          //     footer_nav[2].style.color = 'red';
          //     store.commit("updateFooterNav",2);
          //     this.$router.push({path:'/Inbox'});
          //   }
          // },

          // skip_personPage(){
          //   var footer_nav = document.getElementsByClassName('footer-nav')[0].getElementsByTagName('li');
          //   for(var i=0;i<footer_nav.length;i++){
          //     footer_nav[i].style.color = 'black';
          //   }
          //   footer_nav[3].style.color = 'red';
          //   store.commit("updateFooterNav",3);
          //   this.$router.push({path:'/personpage'});
          // }

        }
    }
</script>
