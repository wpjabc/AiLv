<template>
    <div class="equipment">
        <header>
            <x-icon @click="$router.go(-1)" type="ios-close-empty" size="50"></x-icon>
        </header>
        <div class="container-equip">
            <p class="big strong">便利设施</p>
            <ul class="ul-equip">
                <li v-for="(item,key,index) in allList" :key="index" class="big" v-if="equipList.indexOf(item) >= 0">
                    <span>{{ item }}</span>
                   <i :class="'iconfont '+classList[key]" style="font-size:2rem"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                equipList:[],
                allList:['宽带上网','空调','吹风机','24小时热水','暖气','行李寄存',
                         '接站服务','接机服务','接待外宾','西式餐厅','中式餐厅',
                         '残疾人设施','室外游泳池','室内游泳池','会议室','健身房',
                         'SPA','无烟房','商务中心','酒吧','温泉','棋牌室'],
                classList:["icon-wifi","icon-kongdiao","icon-chuifengji","icon-reshui","icon-nuanqi","icon-xinglijicun",
                           "icon-jiezhanfuwu","icon-jiejifuwu","icon-jiedaiwaibin","icon-canting","icon-zhongcanting",
                           "icon-canjiren","icon-shiwaiyouyongchi","icon-shineiyouyongchi","icon-huiyishi","icon-jianshenfang-",
                           "icon-spa","icon-mayishangchengdaizhifudengicon12","icon-shangwuzhongxin","icon-jiuba","icon-wenquan","icon-qipaishi"]
            }
        },
        store,
        components:{
            
        },
        mounted(){
            const _this = this;
            store.commit('getHotelEquipment',function(data){
                _this.equipList = data;
                console.log(data)
            })
        },
        methods:{

        }
    }
</script>

<style>
    @import url('../../../static/css/hotel/equipment.css');
     @import url('../../../static/font/iconfont.css');
</style>


