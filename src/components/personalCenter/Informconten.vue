<template>
    <div class="Informconten">
        <div class="Informconten-header">
            <span @click="$router.push({path:'/Inform'})"> <i class="iconfont">&#xe617;</i> </span>
        </div>
        <div class="Informconten-title"><span>{{getInformData.username}}</span></div>
        <div class="Informconten-inform">{{getInformData.content}}</div>
        <p class="Informconten-time">{{getInformData.time}}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        
        data(){
            return{
                getInformData:{},
            }
        },
        mounted(){
            this.getInform();
           
        },
        methods:{
            //请求
            getInform(){
                axios.get('../../../static/json/personalCenter/Inform.json').then((res)=>{
                    // this.getInformData=;
                    console.log(res.data)
                    for(let i=0; i<res.data.count;i++){
                        if(res.data.users[i].id==this.$route.query.id){
                            this.getInformData=res.data.users[i];
                            console.log(this.getInformData);
                        }
                    }
                    
                    // if(this.$route.query.id){}

                })
            }
        }
    }
</script>

<style>
    .Informconten-header{
        padding:14px;
    }
    .Informconten-header>span>i{
        font-size: 2rem;
    }
    .Informconten-title{
        margin: 0 20px ;
        padding-bottom:10px;
        font-weight: 600;
    }
    .Informconten-inform{
        margin: 0 20px ;
        border: 1px solid rgba(63, 177, 197, 0.527);
        border-radius:5px;
        padding: 10px;
        line-height: 30px;
        letter-spacing:2px;
        text-indent:40px;
    }
    .Informconten-time{
        margin: 20px ;
        text-align: right;
    }
</style>