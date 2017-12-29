<template>
    <div>
        <x-header style="background:#fff" :right-options="{showMore: true}"><span style="color:black">设置</span></x-header>
        <div style="padding: 20px 15px;display:flex" v-on:click="Money"><span>货币</span><span style="flex:1;text-align: right;color:rgb(96, 168, 142)">{{money}}</span></div>
        <div class="lineTop"><span>收款方式</span><i>icon</i></div>
        <div class="lineTop"><span>服务条款</span><i>icon</i></div>
        <div class="lineTop"><span>17.44.1（1590）版</span></div>
        <div class="lineTop"><span>退出</span></div>        

        <actionsheet v-model="show" :menus="menus" theme='android' @on-click-menu="clickMenu"></actionsheet>
    </div>
</template>

<script>
    import { XHeader,Actionsheet } from 'vux'
    export default {
        components:{ XHeader,Actionsheet },
        data () {
            return {
                show:false,
                menus:{
                    menu1:'CNY(￥)',
                    menu2:'Dollar($)',
                },
                money:'CNY(￥)',
            }
        },
        methods:{
            Money(){
                this.show=true;
            },
            clickMenu(key){
                // console.log(key);
                if(key=='menu1'){
                    this.money="CNY(￥)";
                }
                if(key=="menu2"){
                    this.money="Dollar($)";
                }
            }
        }
    }
</script>
