<template>
	<ul class="list_main_ul">
		<li class="list" v-for="li in brrs">
			<!-- <router-link to="{path:'/details',query: {name: li.id}" :data-id="li.id"> -->
			<router-link :to="{path:'details',query: {id:li.trainId}}">
				<div class="list_son">
					<ul class="list_son_ul">
						<li>
							<span class="list_time origin_time">{{li.departDepartTime}}</span>
							<span class="origin">{{li.departStationName}}</span>
						</li>
						<li>
							<span class="duration">{{li.durationStr}}</span>
							<span class="number">
								<span>{{li.trainNum}}</span>
								<i></i><i></i>
							</span>
						</li>
						<li>
							<span class="list_time">{{li.destArriveTime}}</span>
							<span class="over">{{li.destStationName}}</span>
						</li>
						<li>
							<span class="money"><i>￥{{li.prices[1].price}}</i></span>
						</li>
					</ul>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script>
	import axios from 'axios'
	export default{
		name: 'list_li',
	    data () {
	      return {
	      		arrs:[],
		      	brrs:[]
	     	}
	    },
	    mounted:function(){
	      this.Hit();
	      this.ajax();
	    },
	    methods:{
	    	ajax:function(){
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
					this.brrs = obj.data.list;
					this.arrs = obj.data.list;
					
				}).catch(error=>console.log(error));
	    	},

	    	Hit:function(){
	    		var that = this;
	    		var bootom = document.getElementsByTagName('footer')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
	    		var go_off = document.getElementsByClassName('go_off')[0];
	    		var time_consuming = document.getElementsByClassName('time_consuming')[0];
	    		var fares = document.getElementsByClassName('fares')[0];
	    		

	    		go_off.onclick = function(){
	    			this.style.color = '#5695E5';
	    			time_consuming.style.color = '';
	    			fares.style.color = '';
	    			for(var i=0;i<that.arrs.length-1;i++){
				        for(var j=0;j<that.arrs.length-1-i;j++){
				            if(that.arrs[j].departDepartTime>that.arrs[j+1].departDepartTime){
				                var temp=that.arrs[j];
				                that.arrs[j]=that.arrs[j+1];
				                that.arrs[j+1]=temp;
				            }
				        }
				    }	
				   
				    that.brrs = '';
				    that.brrs = that.arrs;
				    // console.log(that.arrs)
	    		}
	    		time_consuming.onclick = function(){
	    			this.style.color = '#5695E5';
	    			fares.style.color = '';
	    			go_off.style.color = '';
	    			for(var i=0;i<that.arrs.length-1;i++){
				        for(var j=0;j<that.arrs.length-1;j++){
				            if(parseInt(that.arrs[j].durationStr.substring(0,that.arrs[j].durationStr.indexOf("小时")))>parseInt(that.arrs[j+1].durationStr.substring(0,that.arrs[j+1].durationStr.indexOf("小时")))){
				                var temp=that.arrs[j];
				                that.arrs[j]=that.arrs[j+1];
				                that.arrs[j+1]=temp;
				            }
				        }
				    }
				    that.brrs = '';
				    that.brrs = that.arrs;
				   
	    		}

	    		fares.onclick = function(){
	    			this.style.color = '#5695E5';
	    			go_off.style.color = '';
	    			time_consuming.style.color = '';
	    			for(var i=0;i<that.arrs.length-1;i++){
				        for(var j=0;j<that.arrs.length-1-i;j++){
				            if(that.arrs[j].prices[1].price>that.arrs[j+1].prices[1].price){
				                var temp=that.arrs[j];
				                that.arrs[j]=that.arrs[j+1];
				                that.arrs[j+1]=temp;
				            }
				        }
				    }
				    that.brrs = '';
				    that.brrs = that.arrs;
				   
	    		}
	    	}
	    	// click:function(){
	    	// 	var lists = document.getElementsByClassName('list');
	    	// 	for(let i=0;i<lists.length;i++){
	    	// 		lists[i].onclick = function(){
		    // 			that.$store.state.id = that.$route.query.id;
		    // 		}
	    	// 	}
	    	// }
	    }
	}
</script>