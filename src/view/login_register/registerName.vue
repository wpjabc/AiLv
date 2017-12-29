<template>
    <div :style='{"height":height}' id="regname">
        <header>
            <div class="row-regname">
                <span style="display:block;margin:20px 5px;">
                    <i class="iconfont" style="font-size:2rem" @click="$router.go(-1)">&#xe60a;</i>
                </span>
                <p class="strong">您叫什么名字？</p>
            </div>
        </header>
        <div class="container-regname">
            <div>
                <p>名字</p>
                <input type="text" v-model="userLastName">
            </div>
            <div>
                <p>姓氏</p>
                <input type="text" v-model="userFirstName">
            </div>
        </div>
        <footer>
            <div class="footer-regname">
                <p class="big strong">
                    <i :class="nextPageClass" @click="goRegPhone">&#xe60a;</i>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
    import store from '@/store/store.js'
    export default {
        data(){
            return{
                height:'',
                userFirstName:'',
                userLastName:'',
                nextPageClass:'iconfont login-nogo'
            }
        },
        store,
        mounted(){
            const _this = this;
            this.height = document.documentElement.clientHeight + 'px';
            window.onkeyup = function(){
                // console.log(_this.userLastName)
                if(_this.userFirstName && _this.userLastName){
                   
                    _this.nextPageClass =  'iconfont login-go'
                }else{
                    if(_this.nextPageClass){
                       
                         _this.nextPageClass = 'iconfont login-nogo'
                    }
                }
            }
        },
        methods:{
            goRegPhone(){
                if(!this.userFirstName || !this.userLastName){return;}

                var name = this.userFirstName + this.userLastName;
                store.state.userRegInfo.name = name;
                this.$router.push({path:'/regphone'});
            }
        }
    }
</script>

<style>
    @import url('../../../static/css/login_register/regname.css');
</style>


