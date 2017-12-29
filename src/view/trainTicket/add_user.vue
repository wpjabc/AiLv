<template>
  <div>
    <!-- 头部 -->
    <div id="header">
      <x-header :left-options="{backText: ''}"></x-header>
      <div class="title">添加新乘客</div>
    </div>
    <!-- 主题内容 -->
    <div class="content">
      <form @submit.prevent="submit">
        <group title="">
          <!-- 姓名填写 -->
          <x-input title="乘客姓名" name="username" placeholder="必须填写" is-type="china-name" v-model="user.name"></x-input>

          <!-- 乘客类型 -->
          <div class="vux-x-input weui-cell">
            <div class="weui-cell__hd"><!----> 
              <label for="vux-x-input-cireo" class="weui-label" style="width: 5em;">乘客类型</label> <!---->
            </div> 
            <div id="ticket_type">
              <checker v-model="user.user_type" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.type}}</checker-item>
              </checker>
            </div>
          </div>

          <!-- 证件类型 -->
          <div id="type">
            <selector title="证件类型" :options="['身份证', '护照', '台胞证', '港澳通行证']" v-model="user.ticker_type"></selector>
          </div>
          
          <!-- 证件号码填写 -->
          <x-input title="证件号码" placeholder="必须填写" :min="2" :max="18" v-model="user.user_num"></x-input>
        </group>

        <!-- 按钮 -->
        <div style="padding: 0.5rem 0.5rem;">
          <flexbox-item>
            <x-button type="warn">完成</x-button>
          </flexbox-item>
        </div>
      </form>

      
    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, Flexbox, FlexboxItem, Divider, Checker, CheckerItem, XInput, Group, CheckIcon, XButton,Selector } from 'vux'
import store from '../../store/store.js'

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
    Selector
  },
  data () {
    return {
      items1: [{
        key: '1',
        type: '成人票'
      }, {
        key: '2',
        type: '学生票'
      }],
      demo12: {key: '1', type: '成人票'},
      value2: '身份证',
      user: {
            name: '',
            user_type: {key: '1', type: '成人票'},
            ticker_type: '身份证',
            user_num: ''
        }
    }
  },
  store,  //使用状态管理
  methods: {
      submit: function() {
        var formData = JSON.stringify(this.user); // 这里才是你的表单数据
        console.log(formData);

        let obj1 = {
          name:this.user.name,
          user_type:this.user.user_type,
          ticker_type:this.user.ticker_type,
          user_num:this.user.user_num
        }
        store.commit('setAddUser',obj1);        //将数据保存到全局变量中

        // this.$router.push({ path:'/trainTicketOrder' })
        this.$router.go(-1)
      }
  }
}

</script>

<style>
  /************** 头部样式 **************/
  #header .vux-header {
      background-color: #fff;
  }
  #header .vux-header .vux-header-title {
    color: #000;
  }
  #header .title{
    height: 0.9375rem;
    line-height: 0.9375rem;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }

  /**************** 主题内容 *************/
  .content{
    position: relative;
  }

  /*乘客类型*/
  #ticket_type .title{
    padding: 0.25rem 0rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  #ticket_type .box {
    padding: 0 0.46rem;
  }
  #ticket_type .demo1-item {
    border: 1px solid #ececec;
    padding: 0.4rem 0.6rem;
    line-height: 0.6875rem;
    font-size: 1rem;
    margin-right: 0.375rem;
    text-align: center;
  }
  #ticket_type .demo1-item-selected {
    border: 1px solid green;
  }

  /* 证件类型 */
  #type .weui-cell__hd{
    width: 23%;
  }

</style>