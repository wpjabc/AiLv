<template>
    <div :style='{"height":height}' id="regPsw">
        <header>
            <div class="row-regname">
                <span style="display:block;margin:20px 5px;">
                    <i class="iconfont" style="font-size:2rem" @click="$router.go(-1)">&#xe60a;</i>
                </span>
                <p class="strong">设置密码</p>
                <p class="normal">
                    您的密码不能少于8个字符。请不要使用任何常见密码、重复或连续的字符串。您可以增加密码的长度，或在密码中加入！、#%等字符。
                </p>
            </div>
        </header>
        <div class="container-regname">
            <div>
                <p>密码</p>
                <input :type="showType[0]" v-model="userPassword" >
                <p style="text-align:right;margin-top:1rem"><span @click="changeShow">{{ showTxt[0] }}</span></p>
            </div>
        </div>
        <footer>
            <div class="footer-regname">
                <p class="big strong">
                    <i :class="nextPageClass" @click="successRegister">&#xe60a;</i>
                </p>
            </div>
        </footer>

        <toast v-model="showToast" @on-hide="toastHide">注册成功</toast>
    </div>
</template>

<script>
    import { AlertModule, Toast } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                height:'',
                userPassword:'',
                showType:['password','text'],
                showTxt:['显示','隐藏'],
                showToast:false,
                nextPageClass:'iconfont login-nogo'
            }
        },
        store,
        components:{
            AlertModule,
            Toast
        },
        mounted(){
            const _this = this;
            this.height = document.documentElement.clientHeight + 'px';
            window.onkeyup = function(){
                if(_this.userPassword && _this.userPassword.length >= 8){
                    _this.nextPageClass = 'iconfont login-go'
                }else{
                    if(_this.nextPageClass){
                         _this.nextPageClass = 'iconfont login-nogo'
                    }
                }
            }
        },
        methods:{
            changeShow(){
                this.showType.unshift(this.showType.pop());
                this.showTxt.unshift(this.showTxt.pop());
            },
            successRegister(){
                const _this = this;
                if(this.userPassword && this.userPassword.length < 8){
                    this.showModule('您的密码不能少于8个字符')
                    return;
                }
                store.state.userRegInfo.password = this.userPassword;
                var name = store.state.userRegInfo.name;
                var password = store.state.userRegInfo.password;
                var phone = store.state.userRegInfo.phone;

                $.ajax({
                    type:"post",
                    url:"http://192.168.1.186:3000/adduser",
                    data:{
                        phone:phone,
                        password:password,
                        name:name
                    },
                    success(res){
                        if(res.status == 200){
                            _this.showToast = true;
                        }else if(res.status == 404){
                            console.log('注册失败')
                        }
                    }
                })
            },
            showModule (str,flag) {
                let _this = this;
                AlertModule.show({
                    title: '爱旅提示您',
                    content:str,
                })
            },
            toastHide(){
                store.state.userRegInfo = {
                    name:'',
                    phone:null,
                    password:null
                }
                this.$router.push({path:'/login'})
            }
        }
    }
</script>

<style>
 @import url('../../../static/css/login_register/regpassword.css');
</style>


