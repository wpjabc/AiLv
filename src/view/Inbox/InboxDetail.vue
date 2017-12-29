<template>
    <div>
        <div class="InboxDetail-container">

          <div class="InboxDetail-header">
            <i class="iconfont" @click="goBack" style="font-size:2rem">&#xe60a;</i>
            <!-- <i class="iconfont" @click="showOperation">&#xe672;</i> -->
          </div>

          <div class="InboxDetail-operation" v-show="operation_flag">

              <div class="operation-frame">
                <i class="iconfont">&#xe672;</i>
                <span>反馈</span>
              </div>

              <div class="operation-frame">
                <i class="iconfont">&#xe672;</i>
                <span>删除</span>
              </div>
          </div>

          <div class="InboxDetail-title">
            <p><b>{{info.title}}</b></p>
          </div>

          <div class="InboxDetail-content">
            <p>{{info.content}}</p>
          </div>

        </div>
    </div>
</template>

<style>
  @import url('../../../static/css/Inbox/InboxDetail.css');
</style>

<script>
    import axios from 'axios'
    export default{
        data () {
            return {
              operation_flag:false,
              info:{},
            }
        },
        mounted:function () {
          let id = this.$route.query.id;

          axios.get('../static/json/inbox/data_json.json').then(res =>{
            for(var i=0;i<res.data.information.length;i++){
              id == res.data.information[i].id ? this.info = res.data.information[i] : console.log(res.data.information[i]);
            }
          })
        },



        methods:{
          showOperation(){
              if(this.operation_flag == false){
                this.operation_flag = true;
              }else{
                this.operation_flag = false;
              }
          },
          goBack(){
              this.$router.go(-1);
          }
        }
    }
</script>
