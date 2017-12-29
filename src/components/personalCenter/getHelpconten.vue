<template>
        <div>
            <x-header style="background:#fff" :right-options="{showMore: true}"><span style="color:black">获取帮助</span></x-header>
            <div class="linebottom"><span>{{question[ $route.params.index - 1 ]}}</span></div>
            <p></p>
            <div class="box">答：<p v-html="answer[ $route.params.index - 1 ]"></p></div>

            <!-- <div>dsafds</div> -->
        </div>
</template>

<script>
    import { XHeader,Actionsheet } from 'vux';
    export default {
        components:{ XHeader,Actionsheet },
        data (){
            return{
                question:['我是否可以取消或修改订单？','如何查看订单信息？','我想多住几天怎么办？','什么是订单的最晚取消时间？','我遇到问题，如何反馈？','火车票如何支付票款？','每个订单我最多能买几张票？','儿童需要额外收取费用吗？','付款的方式有哪些？'],
                answer : [
                    '在付款前，您可以取消订单。由于是非常优惠的折扣价格，酒店预订规则较严格，对于已付款的订单，不支持取消与变更。',
                    '个人页面-历史订单，可找到订单信息',
                    '是否可以延住需要视酒店房间情况而定，建议您至少提前一天在网上重新预订或者直接在酒店办理延住',
                    '预付及担保订单有规定的最晚取消时间，在此时间前取消，不扣除房费。超过最晚取消时间进行取消操作,去哪儿网将扣除相应的房费。',
                    '如果您有任何问题或疑问，请在“个人主页-反馈”提交你的问题或疑问，我们将竭诚为您提供帮助。',
                    '目前火车票支付方式分为：信用卡、借记卡及第三方平台支付三种方式，具体支持的卡种等信息以您购买时页面提示信息为准。<br/>购票时，须在下单成功后30分钟内完成网上票款支付，否则订单会被超时取消，无法继续支付。<br/>用户支付成功后代理商出票前，用户取消订单，代理商给用户全额退款。<br/>(温馨提示：为保障您的资金安全,请确保只使用在线支付,切勿通过其他支付方式（转账、汇款等)支付。)',
                    '一张有效身份证件同一乘车日期同一车次限购一张车票。同一笔订单可购买的车票数量不超过5张。',
                    '不同目的地，不同产品类型，供应商对儿童是否需要额外收费的标准不一样，页面上会对儿童价标注出来，也可以通过页面上的电话与供应商确认。',
                    '旅游线路类产品有：在线付款，线下付款，两种方式。景区门票类产品有：在线付款，线下付款，及景区付款三种方式。'
                ]
            }
        }  
    }
</script>

<style>
    .linebottom{
        border-bottom: 1px solid #d8d1d1;
        padding:  15px 0;
        margin: 0 20px;
        display:flex;
    }
</style>