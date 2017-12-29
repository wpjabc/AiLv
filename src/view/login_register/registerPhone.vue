<template>
    <div :style='{"height":height}' id="regphone">
        <header>
            <div class="row-regname">
                <span style="display:block;margin:20px 5px;">
                    <i class="iconfont" style="font-size:2rem" @click="$router.go(-1)">&#xe60a;</i>
                </span>
                <p class="strong">还有，您的手机号是？</p>
            </div>
        </header>
        <div class="container-regname">
            <p>电话</p>
            <x-input id="xinput" mask="999 9999 9999" v-model="userPhone" :max="13" is-type="china-mobile"></x-input>
        </div>
        <footer>
            <div class="footer-regname">
                <p class="big strong">
                    <i :class="nextPageClass" @click="goRegPsw">&#xe60a;</i>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
    import { XInput, AlertModule } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                height:'',
                userPhone:null,
                nextPageClass: 'iconfont login-nogo'
            }
        },
        store,
        components:{
            AlertModule,
            XInput
        },
        mounted(){
            const _this = this;
            this.height = document.documentElement.clientHeight + 'px';
             window.onkeyup = function(){
                if(_this.userPhone && _this.userPhone.length == 13){
                    _this.nextPageClass =  'iconfont login-go'
                }else{
                    if(_this.nextPageClass){
                         _this.nextPageClass = 'iconfont login-nogo'
                    }
                }
            }
        },
        methods:{
            goRegPsw(){
                const _this = this;
                var phone = this.userPhone
                phone = phone.split(' ').join('');
                if(!phone || phone.length != 11){return}

                $.ajax({
                    type:"post",
                    url:"http://192.168.1.186:3000/checkuser",
                    data:{
                        phone:phone
                    },
                    success(res){
                        if(res.status == 404){
                            _this.showModule();
                        }else if(res.status == 200){
                            store.state.userRegInfo.phone = phone;
                            _this.$router.push({path:'/regpassword'})
                        }
                    }
                })
            },
            showModule(){
                AlertModule.show({
                    title: '爱旅提示您',
                    content: '该手机号已经被注册，请重新输入手机号码',
                })
            }
        }
    }
</script>

<style>
@import url('../../../static/css/login_register/regphone.css');
</style>


