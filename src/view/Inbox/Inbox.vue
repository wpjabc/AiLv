<template>
    <div>
        <div class="Inbox2-container">
          <!--头部-->
          <div class="Inbox2-header">
            <i class="iconfont" @click="clearAllInbox">&#xe601;</i>
          </div>

          <div class="p-top"></div>

          <div class="Inbox2-title"><span>消息</span></div>

          <div class="information-list">

            <div class="information-content">

              <div class="information" v-for="item in information" v-bind:data-id="item.id" @click="skip_InboxDetail(item.id)">

                <div class="information-details">
                  <div class="information-title"><p>{{item.title}}</p></div>
                  <div class="information-main"><p>{{item.content}}</p></div>
                </div>

                <div class="information-delete">
                  <i class="iconfont" v-on:click.stop="showPlugin(item.title,item.id)">&#xe601;</i>
                </div>


              </div>



            </div>

          </div>

          <nav-footer></nav-footer>

        </div>
    </div>
</template>

<style>
  @import url('../../../static/css/Inbox/Inbox2.css');
</style>

<script>
    import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'
    import axios from 'axios'
    import navFooter from '../index/footer.vue'
    export default{
        data () {
            return {
              information:[],
              Scrolltop:0,
            }
        },
        components: {
          Confirm,
          Group,
          XSwitch,
          XButton,
          navFooter
        },
        mounted:function () {
            this.onload();
            this.addListenerScoll();
        },
        methods:{
            //初始化事件
            onload(){
              axios.get('../static/json/inbox/data_json.json').then(res =>{
                  this.information = res.data.information;
              })
            },

            //监听滚动事件
            addListenerScoll(){
              var that = this;
              var header = document.getElementsByClassName('Inbox2-header')[0];
              var compile = header.getElementsByClassName('iconfont')[0];

              window.onscroll = function(){
                var top = document.getElementsByTagName('body')[0].scrollTop;
                if(top>that.Scrolltop){
                  header.style.height = 0;
                  compile.style.fontSize = 0;
                }else{
                  header.style.height = 3+'rem';
                  compile.style.fontSize = 1+'rem';
                }

                that.Scrolltop = top;
              }


            },

          //跳转到首页事件
          skip_index(){

            var footer_nav = document.getElementsByClassName('footer-nav')[0].getElementsByTagName('li');

            if(footer_nav[0] != 'red'){
              this.$router.push({path:'/index'});
              for(var i=0;i<footer_nav.length;i++){
                footer_nav[i].style.color = 'black';
              }
              footer_nav[0].style.color = 'red';
            }
          },

            //清除所有时间
            clearAllInbox(){
              this.$vux.confirm.show({
                title: '一键删除',
                content: '确认删除吗？',
                onConfirm () {
                  $('.information').remove();
                }
              })
            },

            //清除当前信息事件
            showPlugin (title,id) {
              this.$vux.confirm.show({
                title: title,
                content: '确认删除吗？',
                onConfirm () {
                  for(var i=0;i<$('.information').length;i++){
                    $('.information').eq(i).attr('data-id') == id ? $('.information').eq(i).remove(): $('.information').eq(i).attr('data-id');
                  }
                }
              })
            },

            skip_InboxDetail(id){
              this.$router.push({path:'/InboxDetail',query:{id:id}})
            }
        }
    }
</script>
