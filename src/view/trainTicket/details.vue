<template>
	<div>
		
		<header>
			<span @click="$router.go(-1)"><i class="iconfont" style="color:black;position:relative;z-index:100;font-size:2rem">&#xe60a;</i></span>
			<ul class="header_ul">
				<li>
					<ul class="li_ul">
						<li>
							<a href="javascript:history.go(-1)"><i class="iconfont icon-zuo"></i></a>
						</li>
						<li class="location">
							<span class="depart"></span>
							<span>{{arrs.trainNum}}</span>
							<span class="terminus"></span>
						</li>
						<li></li>
					</ul>
				</li>
				<li>
					<ul class="li_ul li_ul2">
						<li class="past"></li>
						<li class="location">
							<span class="location_date">{{date}}</span>
							<span class="location_week"></span>
							<i class=""></i>
						</li>
						<li class="tomorrow"></li>
					</ul>
				</li>
			</ul>
		</header>
		<div class="details_main">
			<div class="details_top">
				<ul>
					<li>
						<ul>
							<li><span>{{arrs.departStationName}}</span></li>
							<li class="details_time"><span>{{arrs.departDepartTime}}</span></li>
							<li><span>11-23</span><span>周四</span></li>
						</ul>
					</li>
					<li>
						<ul>
							<li><span>{{arrs.trainNum}}高速车</span></li>
							<li><i class="border"></i><span class="border_span">时刻表</span></li>
							<li><span>耗时{{arrs.durationStr}}</span></li>
						</ul>
					</li>
					<li>
						<ul>
							<li><span>{{arrs.destStationName}}</span></li>
							<li class="details_over"><span>{{arrs.destArriveTime}}</span></li>
							<li><span>11-23</span><span>周四</span></li>
						</ul>
					</li>
				</ul>
			</div>
			<ul class="purchase">
				<li v-for="price in arrs.prices">
					<ul>
						<li><span>{{price.seatName}}</span></li>
						<li><span>￥{{price.price}}</span></li>
						<li><span>{{price.leftNumber}}张</span><span class="reservation" @click="$router.push({path:'/trainTicketOrder/'+price.seatName+'/'+trainID})">预订</span></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>



<script>
import axios from 'axios'
	export default{
		data () {
	      return {
	      		arrs:[],
				  date:'',
				  trainID:'',
	     	}
	    },
		computed: {
	      id () {
	        return this.$store.state.id;
	      }
	    },
	    mounted:function(){
	    	this.ajax();
			this.date = new Date().toLocaleDateString(); 
			this.trainID = this.$route.query.id
	    },
	     methods:{
	    	ajax:function(){
	    		var that = this;
	    		axios({
				  method: 'get',
				  url: 'train.json',
				  baseURL:'http://192.168.1.190:8081/static/json/trainTicket/',
				  headers: {
		            'Content-Type': 'application/x-www-form-urlencoded'
		      		},
				  data: {
				    firstName: 'Fred',
				    lastName: 'Flintstone'
				  }
				}).then(res=>{
					var str = JSON.stringify(res.data); 
					var obj = JSON.parse(str);
					
					for(let i=0;i<obj.data.list.length;i++){
						if(obj.data.list[i].trainId == that.$route.query.id){
							that.arrs = obj.data.list[i];
							console.log(this.arrs)
						}
					}
				}).catch(error=>console.log(error));
	    	}
	    }
	}
</script>


<style>
	@import url("../../../static/css/trainTicket/details.css");
</style>