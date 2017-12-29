<template>
    <div :style='{"height":height}' id="login">
        <header>
            <div class="row-regname">
                <span style="display:block;margin:20px 5px;">
                    <i class="iconfont" style="font-size:2rem" @click="$router.go(-1)">&#xe60a;</i>
                </span>
                <p class="strong">登录</p>
            </div>
        </header>
        <div class="container-regname">
            <div>
                <p>电话</p>
                <x-input id="xinput" mask="999 9999 9999" v-model="userPhone" :max="13" is-type="china-mobile"></x-input>
            </div>
            <div>
                <p>密码</p>
                <input :type="showType[0]" v-model="userPassword" >
                <p style="text-align:right;margin-top:1rem"><span @click="changeShow">{{ showTxt[0] }}</span></p>
            </div>
        </div>
        <footer>
            <div class="footer-regname">
                <p class="big strong">
                    <i :class="nextPageClass[0]" @click="checkUser">&#xe60a;</i>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
    import { XInput, AlertModule, cookie } from 'vux'
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                height:'',
                userPassword:null,
                userPhone:null,
                showType:['password','text'],
                showTxt:['显示','隐藏'],
                nextPageClass:['iconfont login-nogo','iconfont login-go']
            }
        },
        store,
        mounted(){

            const _this = this;
            this.height = document.documentElement.clientHeight + 'px';
            window.onkeyup = function(){
                if(_this.userPhone && _this.userPassword){
                    _this.nextPageClass =  ['iconfont login-go','iconfont login-nogo']
                }else{
                    if(_this.nextPageClass){
                         _this.nextPageClass = ['iconfont login-nogo','iconfont login-go']
                    }
                }
            }
        },
        components:{
            XInput
        },
        methods:{
            changeShow(){
                this.showType.unshift(this.showType.pop());
                this.showTxt.unshift(this.showTxt.pop());
            },
            // 检查账号密码是否正确
            checkUser(){
                if(!this.userPhone || !this.userPassword){return;}

                this.userPhone = this.userPhone.split(' ').join('')

                const _this = this;
                let url = 'http://192.168.1.186:3000/checklogin'
                $.ajax({
                    type:"post",
                    url:url,
                    data:{
                        phone:_this.userPhone,
                        password:_this.userPassword
                    },
                    success(res){
                        if(res.status == 200){
                            store.state.userInfo.id = res.result.id;
                            store.state.userInfo.name = res.result.name;

                            // 登录成功后通过cookie获取当前的时间戳与用户id值
                            var date = new Date;
                            const times = date.getTime();
                            cookie.set('time',res.result.id+'-'+ res.result.name +'-'+times);

                            //跳转到首页
                            _this.$router.push({path:'/home'})
                        
                        
                        }else if(res.status == 404){
                            _this.showModule();
                        }
                         
                    }
                })
                
            },
            showModule () {
                AlertModule.show({
                    title: '爱旅提示您',
                    content:'账户或密码错误，请重新输入'
                })
            }
        }
    }
</script>

<style>
    @import url('../../../static/css/login_register/login.css');
    .login-go{
        font-size:2rem;
        transform: rotate(180deg);
        border:3px solid white;
        padding:10px;
        border-radius: 50%;
        position: absolute;
        bottom: 44px;
        right: 10px;
    }
    .login-nogo{
        font-size:2rem;
        transform: rotate(180deg);
        border:3px solid rgba(255,255,255,0.2);
        color:rgba(255,255,255,0.2);
        padding:10px;
        border-radius: 50%;
        position: absolute;
        bottom: 44px;
        right: 10px;
    }
</style>


