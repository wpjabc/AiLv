<template>
  <div>
    <!-- 头部 -->
    <div id="trainTicketOrder">
      <x-header :left-options="{backText: ''}"></x-header>
      <div class="title">订单填写</div>
    </div>
    <!-- 主题内容 -->
    <div class="content">
      <!-- 车票信息 -->
      <div class="ticket" id="train">
        <div class="vux-flexbox vux-flex-row">
          <div class="vux-flexbox-item" style="margin-left: 8px;">
            <div class="flex-demo">
              <div class="address_start">{{train.departStationName}}</div>
              <div class="time_start">{{train.departDepartTime}}</div>
              <!-- <div class="date_start">11-21 周二</div> -->
            </div>
          </div> 
          <div class="vux-flexbox-item" style="margin-left: 8px;">
            <div class="flex-demo">
              <div class="number">{{train.trainNum}} {{train.trainTypeName}}</div>
              <div class="router-view text">
                <p class="vux-divider">时刻表</p>
              </div>
              <div class="times">耗时{{train.durationStr}}</div>
            </div>
          </div> 
          <div class="vux-flexbox-item" style="margin-left: 8px;">
            <div class="flex-demo">
              <div class="flex-demo">
                <div class="address_end">{{train.destStationName}}</div>
                <div class="time_end">{{train.destArriveTime}}</div>
                <!-- <div class="date_end">11-21 周二</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 座位类型 -->
      <div id="seat">
        <div class="title">选择坐席</div>
        <!-- <checker v-model="demo12" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}<br>￥{{item.price}}<br>{{item.number}}</checker-item>
        </checker> -->

        <checker v-model="demo12.price" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item :value="item.price" v-for="(item, index) in items1" :key="index">{{item.value}}<br>￥{{item.price}}<br>{{item.number}}</checker-item>
        </checker>
      </div>

      <!-- 车票使用者信息 -->
      <div id="ticket_user">
        <div class="title">订票乘客</div>
        <!-- <div class="left" id="box">
          <span>
            <span>{{ trainOrder.name }}</span>
            <span>{{ trainOrder.type }}</span><br>
            <span>{{ trainOrder.number }}</span>
          </span>
          <span id="close_btn" v-on:click="closeBtn">
            <x-button mini type="warn">X</x-button>
          </span>
        </div> -->

        <div class="left" id="box" v-for="(test,index) in arr" :key="index">
          <span style="padding:6px; display:block;">
            <span>{{ test.name }}</span>
            <span>{{ test.user_type.type }}</span><br>
            <span>{{ test.user_num }}</span>
          </span>
          <span id="close_btn" v-on:click="closeBtn(index)">
            <i class="iconfont" style="font-size:1.5rem">&#xe617;</i>
          </span>
        </div>
        
      </div>

      <!-- 添加乘客 -->
      <div id="add_passenger"  v-on:click="goAddUser">
        <div class="alink">
            <span class="alink_icon"><x-icon type="ios-plus-outline" size="22"></x-icon></span>
            <span class="alink_text">添加乘客</span>
        </div>
      </div>
      
      <!-- 手机号码(联系人) -->
      <div id="contacts">
        <group title="">
          <x-input title="手机号码" name="mobile" placeholder="通知出票状态和出票信息" keyboard="number" is-type="china-mobile" :max="11" v-model="trainOrder.phone"></x-input>
        </group>
      </div>

      <!-- 预订须知 -->
      <div id="notice">
        <div class="notice_content">
          <!-- <check-icon :value.sync="demo2" type="plain"> {{ agree }} </check-icon> -->
          <check-icon :value.sync="demo1"> {{ agree }} </check-icon>
          <a href="#">《预订须知》</a>
        </div>
      </div>

      <!-- 支付信息 -->
      <div id="pay" v-on:click="trainPay">
        <flexbox>
          <!-- 左边 -->
          <flexbox-item>
            <div class="pay_left">
              <span>金额￥</span>
              <span class="price">{{ demo12.price * arr.length }}</span>
            </div>
          </flexbox-item>
          <!-- 右边 -->
          <flexbox-item>
            <x-button type="warn">支 付</x-button>
          </flexbox-item>
        </flexbox>
      </div>

    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, Flexbox, FlexboxItem, Divider, Checker, CheckerItem, XInput, Group, CheckIcon, XButton, Confirm } from 'vux'
import store from '../../store/store.js'
import axios from 'axios'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    Flexbox, 
    FlexboxItem,
    Divider,
    Checker,
    CheckerItem,
    XInput,
    Group,
    CheckIcon,
    XButton,
    Confirm
  },
  data () {
    return {
      items1: [],
      demo12:{},
      demo13:[],
      agree: '已阅读',
      demo1: false,
      totalPrice:0,
      train:{},
      trainOrder: {
        name: '刘小帅',
        type: '成年票',
        number: '445831199709160231',
        phone: '',
        ticket_pay: '1748'
      },
      arr: []
    }
  },
  store,
  mounted(){
    // 获取用户选择的火车信息
    var id = this.$route.params.id;
    axios.get('../../../static/json/trainTicket/train.json').then(res =>{
      var allTrain = res.data.data.list;
      for(let i=0; i<allTrain.length; i++){
        if(id == allTrain[i].trainId){
            this.train = allTrain[i];
            for(let j=0; j<allTrain[i].prices.length;j++){
              var seatType = {
                key:j,
                value:this.train.prices[j].seatName,
                price:this.train.prices[j].price,
                number:this.train.prices[j].leftNumber+'张'

              }
              this.items1.push(seatType);
              this.demo12= {seat:this.$route.params.seat,price:seatType.price};

              if(this.demo12.seat=="商务座"){
                this.demo12.price = this.train.prices[0].price;
              }else if(this.demo12.seat=="一等座"){
                this.demo12.price = this.train.prices[1].price;
              }else if(this.demo12.seat=="二等座"){
                this.demo12.price = this.train.prices[2].price;
              }
              
              console.log(this.demo12.price);
            }
        }
      }
      
    })

    console.log(this.$route.params)
    // console.log(store.state.add_user.name);
    this.arr = store.state.add_user;
    this.totalPrice = this.trainOrder.ticket_pay * this.arr.length;
    console.log(this.arr);
  },

methods: {
    goAddUser: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      this.$router.push({ path:'/addUser' })
    },
    closeBtn: function (index) {
      // var del_btn = document.getElementById('close_btn');
      // var odiv = document.getElementById('box');
      // odiv.parentNode.removeChild(odiv);    //删除用户
      // this.arr.length--;
      this.arr.splice(index,1);
      this.totalPrice = this.demo12.price * this.arr.length;
      console.log( '乘客数：');
      console.log(this.arr);
      console.log( '总价'+this.totalPrice);      
      return this.arr.length;
    },
    trainPay: function (event) {
      const _this = this;
      var orderData = JSON.stringify(this.trainOrder); // 这里才是你的表单数据
      console.log(orderData);
      var ticket_pay = JSON.stringify(this.trainOrder.ticket_pay); // 这里才是你的表单数据
      this.$vux.confirm.show({
        title: '已支付该订单支付！',
        content: '每张车票金额为'+(_this.demo12.price * _this.arr.length)+'元',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
          _this.$router.push({ path:'/showTrainOrder' })
        }
      })

      // console.log(this.trainOrder.ticket_pay)
      let obj2 = {
          ticket_tip_num:this.train.trainNum,
          ticket_tip_name:this.train.trainTypeName,
          ticket_tip_time:this.train.durationStr,
          start_address:this.train.departStationName,
          start_address_times:this.train.departDepartTime,
          end_address:this.train.destStationName,
          end_address_time:this.train.destArriveTime,
          ticket_num:this.arr.length,
          ticket_price:this.demo12.price,
          ticket_price_sum:this.demo12.price * this.arr.length
        }
      store.commit('showTicketOrder',obj2);        //将数据保存到全局变量中

      // console.log('我来看看'+obj2.ticket_tip_time);
      
    }

  }
}

</script>

<style>
  /************** 头部样式 **************/
  #trainTicketOrder .vux-header {
      background-color: #fff;
  }
  #trainTicketOrder .vux-header .vux-header-title {
      color: #000;
  }
  #trainTicketOrder .title{
      height: 0.9375rem;
      line-height: 0.9375rem;
      font-size: 1.5rem;
      font-weight: bold;
      padding: 1.5rem 1rem;
  }
  /**************** 主题内容 *************/
  .content{
    position: relative;
  }
  /*车票信息*/
  /*@import '~vux/src/styles/1px.less';*/

  #train{
    padding: 0.25rem 1rem;
    background: #fff;
  }

  #train .flex-demo {
    text-align: center;
    color: #000;
    background-color: #fff;
  }
  /*始发地*/
  #train .address_start{
    text-align: center;
    font-size: 1.3rem;
    padding: 0.125rem 0;
  }
  #train .time_start{
    text-align: center;
    font-size: 0.625rem;
    padding: 0.125rem 0;

  }
  #train .date_start{
    text-align: center;
    font-size: 0.375rem;
    padding: 0.125rem 0;
  }

  /*专列类型*/
  #train .number{
    text-align: center;
    font-size: 0.375rem;
    padding: 0.125rem 0;
    color: #999;
  }
  #train .text{
    text-align: center;
    font-size: 0.375rem;
    color: #999;
  }
  #train .times{
    text-align: center;
    font-size: 0.375rem;
    padding: 0.125rem 0;
    color: #999;
  }

  /*目的地*/
  #train .address_end{
    text-align: center;
    font-size: 1.3rem;
    padding: 0.125rem 0;
  }
  #train .time_end{
    text-align: center;
    font-size: 0.625rem;
    padding: 0.125rem 0;

  }
  #train .date_end{
    text-align: center;
    font-size: 0.375rem;
    padding: 0.125rem 0;
  }

  /*座位类型*/
  #seat{
    padding: 0rem 1rem;
  }
  #seat .title{
    padding: 0.25rem 0rem;
    font-size: 1rem;
    font-weight: bold;
  }
  #seat .box {
    padding: 0 0.46rem;
  }
  #seat .demo1-item {
    border: 1px solid #ececec;
    padding: 0.2rem 1.4rem;
    line-height: 1rem;
    font-size: 0.4375rem;
    margin-right: 0.375rem;
    text-align: center;
  }
 #seat .demo1-item-selected {
    border: 1px solid green;
  }

  /*车票使用者信息*/
  #ticket_user{
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  #ticket_user .title{
    padding: 0.25rem 0rem;
    font-size: 1rem;
    font-weight: bold;
  }
  #ticket_user button.weui-btn_mini{
    border-radius: 50%;
  }
  #ticket_user .weui-btn_mini {
    padding: 0 0.65rem;
  }
  #ticket_user .left{
    border: 1px solid #e9e9e9; 
    position: relative;
    margin-bottom: 5px;
  }
  #ticket_user #close_btn{
    display: block; 
    position: absolute; 
    top: 0px; 
    right: 0px;
  }
  

  /*添加乘客*/
  #add_passenger{
    height: 1rem;
    /*line-height: 1rem;*/
  }
  #add_passenger .alink {
    width: 6rem;
    font-size: 1rem;
    margin: 0.7rem auto;
  }
  #add_passenger .alink .alink_icon,#add_passenger .alink .alink_text{
    display: block;
    float: left;
  }
  #add_passenger .alink .alink_text{
    display: block;
    float: left;
  }

  /*手机号码(联系人)*/
  #contacts .weui-input {
      font-size: 14px;
      text-align: center;
  }

  /*预订须知*/
  #notice {
    margin-bottom: 3rem;
  }
  #notice .notice_content{
    padding: 0.25rem 0.375rem;
    line-height: 1.25rem;
    font-size: 0.8rem;
  }
  #notice .notice_content a{
    color: #E64340;
  }

  /*支付信息*/
  #pay{
    width: 100%;
    position: fixed;
    left: 0;
    /*bottom: 44px;*/
    bottom: 0px;
  }
  #pay .pay_left{
    padding: 0rem 1rem;
    font-size: 1rem;
  }
  #pay .pay_left .price{
    font-size: 1rem;
    font-weight: bold;
    color: #E64340;
  }
</style>