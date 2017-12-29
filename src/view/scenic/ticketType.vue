<template>
  <div>
        <header>
            <x-icon class="back" type="ios-arrow-left" size="40" @click="$router.go(-1)"></x-icon>
        </header>
        <div class="orderTicket">
          
            <div class="type-title">

                <p>票型选择</p>

            </div>    

            <div class="ticket-choice" v-for="(ticket,index) in tickets" :key="index"  @click="choiceType(index)">

                    <!-- 单票选票 -->
                <div class="type-single-ticket ticket-type">
                        
                    <cell   :title="(ticket.type)" is-link :border-intent="false":arrow-direction="show ? 'up' : 'down'">
                        
                    </cell>

                    <p class="slide" v-for="(items,num) in ticket.kind"  :key="num" @click.stop="Alert(num,items.name,items.price)">
                        
                        <span class="classify-type" ><span class="weekend-adult ticket">{{items.name}}</span><span class="price">￥{{items.price}}</span></span>
                        <!-- <inline-x-number width="25px" class="countNumber"   ></inline-x-number> -->
                        <br/>
                       
                    </p>

                </div>


              


                
            </div>
      </div>
      
      
  </div>
</template>
<script>
import { Cell, InlineXNumber } from 'vux' 
import axios from 'axios'


export default {
  data(){
      return{
          id:"",
          show:false,  //判断箭头是往上还是往下
          tickets:[],  //获取json文件数据
          showobj:{},
          num:0,
      }
  },
  components:{
      Cell,
       InlineXNumber
  },
  mounted(){
      
        var city = this.$route.query.city;
        var id = this.$route.query.id;
        axios.get('../../static/json/scenic/scenics.json').then(res =>{
            for(var i=0; i<res.data.data.length;i++){
               //获取数据中城市的下标志、值
               if(res.data.data[i].city == city){
                   //获取到城市后再循环所有景点
                  for(var j=0; j<res.data.data[i].scenics.length;j++){
                    //   判断景点的id值
                      if(res.data.data[i].scenics[j].scenic_id ==id){
                          
                          this.tickets = res.data.data[i].scenics[j].ticket;
                         console.log( this.tickets)
                      }
                  }
                }
            }
          
        })
   
    //   this.id = $route.param.id;
  },
  methods:{
        choiceType(index){
           
            var slide = document.getElementsByClassName('slide');
            var tc = document.getElementsByClassName('ticket-choice');
            var tempSlide = tc[index].getElementsByClassName('slide');
            this.showobj = tempSlide;
            
            this.num = tempSlide.length;
            if(tempSlide[0].classList.contains('animate')){
                clear();
                return;
            }else{
                clear();
            }
            this.show = !this.show;
            for(let i=0; i<tempSlide.length; i++){
                tempSlide[i].classList.add('animate');
            }

            function clear(){
                for(let i=0; i<slide.length; i++){
                    if(slide[i].classList.contains('animate')){

                        slide[i].classList.remove('animate');
                    } 
                }
            }
        },
        Alert(num,name,price){
            // console.log(name)

            this.$router.push({path:'/order-ticket',query:{name:name,price:price}})
            
            // var clickshow = document.getElementsByClassName('countNumber');
            // // var  =document.getElementsByClassName('vux-cell-primary')
            // for (let i=0; i<clickshow.length; i++){
            //     if(clickshow[i].style.display == 'inline-block'){
            //         clickshow[i].style.display = 'none'
                   
                   
            //     }
            // }
            // console.log(this.showobj[num].getElementsByClassName('countNumber'))
            // this.showobj[num].getElementsByClassName('countNumber')[0].style.display = 'inline-block';

        },
        
  }
}
</script>
<style>
    @import url('../../../static/css/scenic/ticketType.css');
</style>

