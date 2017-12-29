<template>
    <div>
       <div class="inform-header">
            <span @click="$router.push({path:'/personpage'})"> <i class="iconfont">&#xe617;</i> </span>
            <p class="gethelp-title">获取帮助</p>
        </div>
        <div>
            <router-link style="padding:  15px 20px;display:inline-block;color:black"  to='/getHelpconten/1'><span>我是否可以取消或修改订单？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/2'><span>如何查看订单信息？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/3'><span>我想多住几天怎么办？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/4'><span>什么是订单的最晚取消时间？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/5'><span>我遇到问题，如何反馈？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/6'><span>火车票如何支付票款？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/7'><span>每个订单我最多能买几张票？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/8'><span>儿童需要额外收取费用吗？</span></router-link>
            <router-link class="lineTop" to='/getHelpconten/9'><span>付款的方式有哪些？</span></router-link>
        </div>
        <!-- <div class="box">{{answer[index]}}</div> -->
    </div>
</template>
    
<script>
    import { XHeader,Actionsheet } from 'vux';
    export default {
        components:{ XHeader,Actionsheet },
        data () {
            return {
            }
        },
    }
</script>

<style>
    .lineTop{
        border-top: 1px solid #d8d1d1;
        padding:  15px 0;
        margin: 0 20px;
        display:flex;
        color:black;
    }
    .box{
        padding:  15px 20px;
        /* position:absolute; */
        /* top:50px; */
        /* background-color: #fff; */
    }
    .gethelp-title{
        font-size: 1.5rem;
        font-weight: 600;
        margin-left: 5px;
        margin-top: 10px;
    }
</style>