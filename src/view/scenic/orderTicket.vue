<template>
  <div >
    <header>
        <div class="header">
           <x-icon class="back" type="ios-arrow-left" size="40" @click="$router.go(-1)"></x-icon>
        </div>
     </header>
    <div class="order-ticket">
     
      <div class="ticket-buy">
        <div class="ticket-booking">
          <p >门票预订</p>
        </div>
        <div>
            <!-- 显示景点名字与单价 -->
          <div class="buying">
            <div class="scenic-name-price">
              <p>{{scenicName}}</p>
              <p>￥{{price}}/张</p>
            </div>
            <div class="buying-tips">
              <p>需要在游玩当天的18:00前预订</p>
            </div>

          </div>
           <!-- 选择游玩日期 -->
          <div class="orderTicket-date">

            <div class="choocing">
              
              <calendar @on-change="onChange" v-model="demo4" :title="('游玩日期')" show-popup-header :popup-header-title="('选择日期')" disable-past></calendar>
            
            </div>

          </div>


          <!-- 选择购买门票数量 -->
          <div class="orderTicket-ticket-num">

            <div class="choocing-ticket-num">
              
              <x-number :title="('购买数量')" @on-change="change"    :min="1" :max="5" :value="1"></x-number>
            
              <div class="buying-tips">
                <p>最多只能购买5张</p>
              </div>
            
            </div>

          </div>
        
        </div>
        
      </div>


      <footer>
        <div class="confirm">
          <div class="confirm-ticket">
              <div class="total-price">
                  <p class="total">总计</p>
                  <p class="rmb-icon">￥</p>
                  <p class="orderTicket-price">{{total}}</p>
              </div>

              <div class="confirm-btn" @click="show = !show">
                  
                <button class="check-ticket"  >提交订单</button>
                  <confirm v-model="show"
                    :title="'爱旅提示您'"
                    @on-cancel="onCancel"
                    @on-confirm="onConfirm"
                    @on-show="onShow"
                    @on-hide="onHide">
                      <p style="text-align:center;">{{ '确定提交订单?' }}</p>
                  </confirm>
              </div>
            
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { Calendar, XNumber, Confirm, } from 'vux'
import store from '../../store/store.js'

export default {
  components: {
    Calendar,
    XNumber,
    Confirm,
    
  },
  store,
  data () {
    return {
      demo4: 'TODAY',
      total:"",
      show:false,
      number:0,
      scenicName:"",
      price:"",
      playdate:'',
      ticketOrder:{},
    }
  },
  mounted(){
    this.price = this.$route.query.price;
    this.scenicName = this.$route.query.name;
    console.log(this.$route.query);
  },
  methods:{
    onChange (val) {
      this.playdate = val;
      // console.log('on change', val)
    },
    change (val) {
      this.total = val*this.price;
      this.number = val;
      // console.log('change', val)
    },
    onCancel () {
      
    },
    onConfirm () {
      
     this.ticketOrder = {
        ticket:this.scenicName,
        ticketNumber:this.number,
        ticketDate: this.playdate,
        ticketsTotal: this.total
      }
      store.commit('setTicketOrder',this.ticketOrder)
      console.log(this.ticketOrder)
      this.$router.push({path:'/submit-order'})
      // console.log('on confirm')
     
    },
    onHide () {
      
    },
    onShow () {
    
    },
  }
}
</script>
<style>

  @import url('../../../static/css/scenic/orderTicket.css');
</style>
 