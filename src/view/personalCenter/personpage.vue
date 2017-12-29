<template>
<div class="personpage">
    <div>
        <div class="person_header">
            <div>
                    <h1>{{ $store.state.userInfo.name }}</h1>
                <router-link to="/profileEditor"><span style="font-size:14px;color:#111111">查看并编辑个人资料</span></router-link>
            </div>
        </div>
    </div>
    <div class="person">
        <div class="person_nav">
                <router-link to="/inform" class="person_nav_list"><cell class="person_cell" title="通知" is-link></cell></router-link>
                <router-link to="/lovehote.1/1" class="person_nav_list"><cell class="person_cell" title="历史订单" is-link></cell></router-link>
                <!-- <router-link to="/service" class="person_nav_list"><cell class="person_cell" title="服务条款" is-link></cell></router-link> -->
                <router-link to="/getHelp" class="person_nav_list"><cell class="person_cell" title="获取帮助" is-link></cell></router-link>
                <router-link to="/feedback" class="person_nav_list"><cell class="person_cell" title="反馈" is-link></cell></router-link>
                <router-link to="/member" class="person_nav_list" ><cell class="person_cell" title="退出" is-link></cell></router-link>
        </div>
    </div>
    <nav-footer></nav-footer>
</div>
</template>

<script>
    import {  Blur,Cell } from 'vux'
    import axios from 'axios'
    import navFooter from '../index/footer.vue'
    import store from '@/store/store.js'
    export default {
        name:"personpage",
        components:{
            Blur,
            Cell,
            navFooter
        },
        store,
        data (){
            return{
                url:'../../../static/images/changlong.jpg'
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
<style>
    @import url('../../../static/css/personalCenter/personpage.css');
    .center {
        text-align: center;
        padding-top: 20px;
        color: #fff;
        font-size: 18px;
    }
    .center img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 4px solid #ececec;
    }
    a,label{
        text-decoration: none;

    }
    .personpage .weui-cell{
        padding:20px 15px !important;
    }
 
</style>