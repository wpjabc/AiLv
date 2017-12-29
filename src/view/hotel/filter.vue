<template>
    <div id="filter">
        <header>
            <div class="row-filter">
                <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
                <p class="strong">筛选</p>
            </div>
        </header>

        <div class="container-filter">
            <div class="oneOfFilter">
                <p class="big price-filter">价格</p>
                    <checklist 
                    label-position="left" 
                    :options="commonList1" 
                    :max="1"
                    v-model="checklist1">
                    </checklist>
            </div>
            <div class="oneOfFilter">
                <p class="big price-filter">酒店类型</p>
                    <checklist 
                    label-position="left"
                    :options="commonList2" 
                    v-model="checklist2" 
                    @on-change="change">
                    </checklist>
            </div>
            <div class="oneOfFilter">
                <p class="big price-filter">便利设施</p>
                    <checklist 
                    label-position="left" 
                    :options="commonList3" 
                    v-model="checklist3" 
                    @on-change="change">
                    </checklist>
            </div>
        </div>
        
        <footer>
            <div class="fixed-filter" @click="submitFilter">
                <x-button type="warn">确定</x-button>
            </div>
        </footer>
    </div>
</template>

<script>
    import { Checklist, XButton } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                commonList1: [ '不限', '¥300以下', '¥300-¥500', '¥500-¥1000', '¥1000以上' ],
                commonList2: [
                    '不限',
                    '经济型', 
                    '舒适型', 
                    '主题酒店', 
                    '高档豪华', 
                    '连锁品牌', 
                    '度假酒店', 
                    '公寓型酒店',
                    '青年旅社',
                    '客栈', ],
                commonList3: [ '不限', '含wifi', '有停车场', '行李寄存', '24小时热水' ],
                checklist1: [ '不限' ],
                checklist2: [ '不限' ],
                checklist3: [ '不限' ],
                filterPrice:{
                    '不限':'0',
                    '¥300以下':'0-300',
                    '¥300-¥500':'300-500',
                    '¥500-¥1000':'500-1000',
                    '¥1000以上':'1000-10000000',
                }
            }
        },
        store,
        components:{
            Checklist,
            XButton
        },
        mounted(){

        },
        methods:{
            submitFilter(){
                let price = this.filterPrice[this.checklist1[0]]
                store.commit('setHotelList',{
                    type:this.checklist2,
                    price:price
                })
                this.$router.push('/hotel')
            },
            change(val, label){
                if(label.length > 1){
                    if(label.indexOf('不限') >= 0){
                        val.shift();
                    }
                }
            }
        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/filter.css');
</style>


