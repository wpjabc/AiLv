

<template>
<div>
    <header>
        <div class="row-order">
            <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
            <p class="strong">填写订单</p>
        </div>
    </header>
    <div class="container-order">
        <div class="info-order big">
            <p>房型信息：{{ $route.query.type }}</p>
        </div>
        <div class="line-order"></div>
        <div class="big">
        <x-number :title="('房间数量：')" v-model="roundValue" button-style="round" :min="1" :max="5"></x-number>
        </div>
        <div class="line-order"></div>
        <calendar
        class="big"
        @on-change="OnChangeStart"
        v-model="startValue"
        :start-date="startDate0"
        :end-date="endDate0"
        :title="('入住时间')"
        show-popup-header
        :popup-header-title="('请选择入住时间')"
        disable-past>
        </calendar>
        <div class="line-order"></div>
        <calendar
        class="big"
        @on-change="OnChangeEnd"
        v-model="endValue"
        :start-date="startDate1"
        :end-date="endDate1"
        :title="('离店时间')"
        show-popup-header
        :popup-header-title="('请选择离店时间')"
        disable-past>
        </calendar>
    </div>
    
    <div class="margin-bottom-5"></div>
    <footer>
        <div class="footer-order">
            <div class="price-order">
              <p>房费总计：￥{{ $route.query.price * roundValue }}</p>
            </div>
            <div @click="submitOrder">
                <x-button class="submit-order strong" type="warn" mini>提交订单</x-button>                
            </div>
        </div>
        <confirm v-model="showConfirm"
        :title="('爱旅提示您')"
        theme="android"
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
            <p style="text-align:center;padding-top:1rem;">确认提交订单吗？</p>
        </confirm>
    </footer>
</div>
</template>



<script>
import { Group, Cell, XNumber, XButton, AlertModule, Confirm, Calendar } from 'vux'
import store from '../../store/store.js'
export default {
  store,
  methods: {
    // 取消模态框
    onCancel () {
      console.log('on cancel');
    },
    // 点击确认订单
    onConfirm () {
      let obj = {
          price:this.$route.query.price,
          roundNumber:this.roundValue,
          start:this.startValue,
          end:this.endValue,
          type:this.$route.query.type
      }
      store.commit('setHotelOrder',obj);        //将数据保存到全局变量中
      this.$router.push({path:'/hotelDetail/showOrder?hotelid='+this.$route.query.hotelid})        //页面跳转
    },
    // 转化日期格式“ 2017-11-11 ”
    getDateString(mydate){
        var nowYear = mydate.getFullYear();
        var nowMonth = mydate.getMonth() + 1;
        var nowDate = mydate.getDate();
        if(nowDate < 10){
            nowDate = '0'+nowDate;
        }
        var nowTime = mydate.getTime();
        var dateString = [nowYear,nowMonth,nowDate].join('-');
        return dateString;
    },
    // 提交订单
    submitOrder(){
        this.showConfirm = true;
    },
    // 入店日期的改变
    OnChangeStart(date){
       let startTime = this.startValue.split('-').join('/');
       let endTime = this.endValue.split('-').join('/');
       if(new Date(startTime).getTime() >= new Date(endTime).getTime()){     //如果离店日期时间戳小于入住日期时间戳
            let time = new Date(startTime).getTime()+(60*60*24*1000);
            this.endValue = this.getDateString(new Date(time));
       }
    },
    // 离店时间的改变
    OnChangeEnd(date){
       let startTime = this.startValue.split('-').join('/');
       let endTime = this.endValue.split('-').join('/');
       if(new Date(startTime).getTime() >= new Date(endTime).getTime()){     //如果离店日期时间戳小于入住日期时间戳
            let time = new Date(endTime).getTime()-(60*60*24*1000);
            this.startValue = this.getDateString(new Date(time));
       }
    }
  },
  mounted(){
    //   入店日历初始化
      this.startDate0 = this.getDateString(new Date());       //当前日期
      this.startValue = this.startDate0;
      let time = new Date().getTime()+(60*60*24*365*1000);    //一年后
      this.endDate0 = this.getDateString(new Date(time));

    // 离店日历初始化
      let time2 = new Date().getTime()+(60*60*24*1000);       //一天后
      this.startDate1 = this.getDateString(new Date(time2));
      this.endValue = this.startDate1;
      let time3 = time2+(60*60*24*365*1000);    //一天后的一年后
      this.endDate1 = this.getDateString(new Date(time3));
  },
  data () {
    return {
      startDate0:'',
      endDate0:'',
      startDate1:'',
      endDate1:'',
      showConfirm:false,
      startValue: '',
      endValue:'',
      roundValue:1
    }
  },
  components: {
    XNumber,
    Group,
    Cell,
    XButton,
    AlertModule,
    Confirm,
    Calendar
  }
}
</script>

<style>
    @import url('../../../static/css/hotel/order.css');
</style>


