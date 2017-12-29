<template>
    <div  v-bind:class="{ wishlist_hidden: classRailwaay }">
        <group-title class="wishlist-main-title">
            <span>{{DataRailway.length}}个可订火车票</span>
            <x-button class="history-warn" mini type="warn" @click.native="historyRailwayDelete">{{deleteText}}</x-button>
        </group-title>

        <view-box  v-for="(i,index) in DataRailway" :key="index">
            <div class="history-Railway-box">
                <div class="history_delete" v-if="deleteShow" @click="RailwayDelete(index)"><i class="iconfont history_delete_icon">&#xe617;</i></div>
                <div>
                    <group-title><h3 style="color:#313030">{{i.startArea}} <b style="font-size:20px;">→</b> {{i.endArea}}</h3></group-title>
                    <group-title class="historyRailway">
                        <div>
                            <p><span>订单状态</span>：<span style="color:#1aa891">{{i.indentStatus}}</span></p>
                            <p><span>订单编号</span>：<span>{{i.indentNumber}}</span></p>
                        </div>
                        <div>
                            <p><span>日期</span>：<span>{{i.indentTime}}</span></p>
                            <p><span>价格</span>：<span style="color:red">￥{{i.indentmoney}}</span></p>
                        </div>
                    </group-title>
                </div>
            </div>
        </view-box>
    </div>
</template>

<script>
import { XHeader,XButton,GridItem,GroupTitle,ViewBox  } from 'vux'
import axios from 'axios'
export default {
  components: {XHeader,XButton,GridItem,GroupTitle,ViewBox },
  data () {
    return{
        classRailwaay:false,
        DataRailway:[],
        historyRouter:true,
        deleteShow:false,
        deleteID:null,
        deleteText:'删除',
    }
  },
  mounted(){
    this.getRailway()
  },
  methods:{
     //请求
    getRailway(){
        axios.get('../../../static/json/personalCenter/historyRailway.json').then((res)=>{
          console.log(res.data);
          this.DataRailway=res.data.historyRailway;
        })
    },

    historyRailwayDelete(){
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
    RailwayDelete(i){
        console.log(i)
        this.DataRailway.splice(i,1);
    }
  }
}
</script>

<style>

  .weui-tab__panel{
    padding:0;
    border-bottom:1px solid rgba(206, 206, 206, 0.527);
  }
  .historyRailway{
display:flex;
}
.historyRailway>div{
flex: 1;
}

.history-Railway-box{
    display:flex;
}
.history_delete{
    margin-left:5px;
    line-height: 110px;
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