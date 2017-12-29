<template>
    <div  v-bind:class="{ wishlist_hidden: classExpr }">
        <group-title class="wishlist-main-title">
          <span>{{Dataexprience.length}}个可订体验</span>
          <x-button class="history-warn" mini type="warn" @click.native="historyScenicDelete">{{deleteText}}</x-button>          
        </group-title>

              <view-box v-for="(i,index) in Dataexprience" :key="index">
                  <div  class="history_scenic" >
                      <div class="history_delete" v-if="deleteShow" @click="ScenicDelete(index)"><i class="iconfont history_delete_icon">&#xe617;</i></div>
                      <div  @click="historyRoter(i)">
                        <div class="history_expr">
                            <group-title class="history_hote_img">
                              <img style="width:60px;height:60px" v-bind:src="i.img[0]" alt="i">
                            </group-title>
                            <div class="history_hote_text">
                                <group-title><h3 style="color:#313030">{{i.name}}</h3></group-title>
                                <group-title><span style="color:goldenrod">{{i.introduction}}</span></group-title>
                            </div>
                        </div>
                      </div>
                  </div>
              </view-box>
       
    </div>
</template> 

<script>
import { XHeader,XButton,GridItem,GroupTitle,ViewBox } from 'vux'
import axios from 'axios'
import store from '@/store/store.js'
export default {
  components: {XHeader,XButton,GridItem,GroupTitle,ViewBox },
  data () {
    return{
      classExpr:false,
      Dataexprience:[],
      historyRouter:true,
      deleteShow:false,
      deleteID:null,
      deleteText:'删除',
    }
  },
  mounted(){
    this.getDataexprience()
  },
   store,
  methods:{
     //请求
     getDataexprience(){
          this.Dataexprience=store.state.HistoryDataScenic;
    },
    /* 修改过的 */
    historyRoter(i){
      if(this.historyRouter){
        this.$router.push({name:'scenic',query:{city : i.city , id : i.scenic_id}})
      }
    },
    historyScenicDelete(){
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
    ScenicDelete(i){
      this.Dataexprience.splice(i,1);
    }
    /* 修改过的 */
  }
}
</script>

<style>
    .history_expr{
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
  .history_scenic{
    display: flex;
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

