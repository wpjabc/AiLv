<template>
    <div>
        <header>
            <div class="row-so">
                <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
                <p class="strong">订单信息</p>
            </div>
        </header>
        <!-- <group>
            <cell-form-preview class="big" :list="ticket_order"></cell-form-preview>
            <cell class="big red" :title="('车票总计')" :value="'￥'+orderInfo.roundNumber*orderInfo.price"></cell>
        </group> -->
        <!-- <div class="trainOrder">
            <form-preview :header-label="title" header-value="微信付款" :body-items="list" :footer-buttons="buttons1"></form-preview>
        </div> -->

        <div class="trainOrder">
            <div class="vux-form-preview weui-form-preview">
                <div class="weui-form-preview__hd">
                    <label class="weui-form-preview__label">付款方式</label> 
                    <em class="weui-form-preview__value">微信付款</em>
                </div> 
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">商品</label> 
                        <span class="weui-form-preview__value">{{ $store.state.ticket_order.ticket_tip_name }}</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">发车站</label> 
                        <span class="weui-form-preview__value">{{ $store.state.ticket_order.start_address }}</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">终点站</label> 
                        <span class="weui-form-preview__value">{{ $store.state.ticket_order.end_address }}</span>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">购买数量</label> 
                        <span class="weui-form-preview__value">{{ $store.state.ticket_order.ticket_num }}张</span>
                    </div>
                </div> 
                <div class="weui-form-preview__ft">
                    <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_default">已完成支付 ￥{{ $store.state.ticket_order.ticket_price_sum }}</a>
                    <a href="javascript:" class="weui-form-preview__btn weui-form-preview__btn_primary">跳转到首页</a>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { Group, Cell, CellFormPreview, FormPreview  } from 'vux'
    import store from '../../store/store.js'
    import axios from 'axios'

    export default {
        data(){
            return{
                orderInfo:{},
                ticket_order: [],
                list: [
                //     {
                //     label: '商品',
                //     value: 'G101 高速动车 一等座 成年票'
                //   }, {
                //     label: '发车站',
                //     value: '北京南'
                //   }, {
                //     label: '终点站',
                //     value: '上海虹桥'
                //   }, {
                //     label: '乘客信息',
                //     value: '刘小帅 445831199709160231'
                //   }
                  ],
                  buttons1: [{
                    style: 'default',
                    text: '已完成支付 ￥933'
                  }, {
                    style: 'primary',
                    text: '跳转到首页',
                    link: '/home'
                  }],
                  title: '付款方式',
                  train:{}
            }
        },
        store,
        components:{
            Group,
            Cell,
            CellFormPreview,
            FormPreview 
        },
        mounted(){

            this.ticket_order = store.state.ticket_order;
            console.log(this.ticket_order);
            console.log(store.state.ticket_order.ticket_tip_num);
            

            // this.list[0].value = store.state.ticket_order.ticket_tip;
            // console.log(this.list[0].value);

        },
        methods:{

        }
    }
</script>

<style>
    .row-so{
        padding:10px;
        margin-bottom:2rem;
    }
    .row-so p{
        font-size: 2rem;
        padding: 10px;
    }
    .trainOrder .vux-form-preview{
        font-size: 1.3rem;
    }
</style>


