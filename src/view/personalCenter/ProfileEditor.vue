<template>
    <div style="background-color:#fff" class="profile">
        <x-header :left-options="{backText: ''}" style="background:#fff;"><span style="color:black">编辑个人资料</span><a slot="right" style="color:#000;font-size:17px" v-on:click="Preserve">保存</a></x-header>

        <div>
            <group-title><h2 style="color:black">私人信息</h2></group-title>
            <cell  v-bind:title="('性别')"  @click.native="Sex" is-link :value="UserInform.sxe"></cell>
            <datetime v-model="UserInform.old"  :title="('出生年月')" :min-year="1500"></datetime>

            <!-- <calendar v-model="demo" :title="('出生年月')" disable-past></calendar> -->
            <x-input title="邮箱" name="email"  is-type="email"  v-model="UserInform.email" placeholder="未填写"></x-input>

            <group-title><h2 style="color:black">选填内容</h2></group-title>
            <x-address title="地址选择"  v-model="UserInform.addressValue" raw-value :list="addressData" value-text-align="right"></x-address>
            <x-input title="学校" name="userschool" v-model="UserInform.userschool" placeholder="未填写"></x-input>
            <x-input title="工作单位" name="userworld" v-model="UserInform.userworld" placeholder="未填写" ></x-input>
            <!-- <cell title="语言" name="userlanguage" @click.native="Language" is-link>{{language}}</cell> -->
            <x-input title="身份证件" name="userID" v-model="UserInform.userID"></x-input>
            
        </div>

        <actionsheet v-model="show1" :menus="menus7" theme='android' @on-click-menu="clickMenu"></actionsheet>
        <!-- <actionsheet v-model="show2" :menus="menus1" theme='android' @on-click-menu="clickMenu1"></actionsheet> -->
    </div>
</template>

<script>
    import { XHeader,GroupTitle,XInput,Actionsheet, Group, XSwitch, Calendar,XAddress,ChinaAddressData,Datetime,Cell  } from 'vux'
    import store from '@/store/store.js'
    export default {
        components:{XHeader,GroupTitle,XInput,Actionsheet, Group, XSwitch, Calendar,XAddress,Datetime,Cell },
        data () {
            return {
                show1:false,
                show2:false,
                menus7: {
                    menu1: '男',
                    menu2: '女',
                },
                demo: 'TODAY',
                addressData: ChinaAddressData,
                UserInform:{},
            }
        },
        store,
        mounted(){
            this.getUserInform();
        },
        methods:{
            clickMenu(key){
                if(key=="menu1"){
                    this.UserInform.sxe='男'
                    console.log(this.sxe);
                }else  if(key=="menu2"){
                    this.UserInform.sxe='女'
                    console.log(this.sxe);
                };
            },
            Sex(){
                this.show1=true;
                console.log(1)
            },
            getUserInform(){
                const _this = this;
                var id = store.state.userInfo.id;
                console.log(store.state.userInfo);
                $.ajax({
                    type:"post",
                    url:"http://192.168.1.186:3000/getuser",
                    data:{
                        id:id
                    },
                    success(res){
                        if(res.status == 200){
                            let data = res.result[0];
                            let date = new Date(data.birthday);
                            date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
                            _this.UserInform = {
                                name:data.name,
                                "sxe":data.sex || '男',
                                "addressValue": data.address.split('/') || '未填写',
                                "old":date || '未填写',
                                "email":data.email || '',
                                "userschool":data.school || '未填写',
                                "userworld":data.work || '未填写',
                                "userID":data.idcard || '未填写'
                            }
                            if(_this.UserInform.userID != '未填写'){
                                _this.UserInform.userID=_this.UserInform.userID.replace(_this.UserInform.userID.substring(6,14),'***')
                            }
                        }
                    }
                })
            },
            Preserve(){
                var address = this.UserInform.addressValue;
                var china = this.addressData;
                for(let i=0; i<address.length; i++){
                    for(let j=0; j<china.length; j++){
                        if(address[i] == china[j].value){
                            address[i] = china[j].name;
                            break;
                        }
                    }
                }
                var data = this.UserInform;
                var birthday = new Date(data.old).getTime()
                $.ajax({
                    type:"post",
                    url:"http://192.168.1.186:3000/update",
                    data:{
                        id:store.state.userInfo.id,
                        sex:data.sxe || null,
                        address:data.addressValue.join('/') || null,
                        birthday:birthday || null,
                        email:data.email || null,
                        school:data.userschool || null,
                        work:data.userworld || null,
                        idcard:data.userID || null
                    },
                    success(res){
                        console.log(res.status);
                    }
                })
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .profile .weui-cell{
        padding:20px 15px !important;
    }
    .profile .weui-input{
        text-align: right !important;
        color:#666;
    }
</style>