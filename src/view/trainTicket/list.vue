<template>
	<div class="ticketList">
		<header class="header">
			<span @click="$router.go(-1)"><i class="iconfont" style="color:black;position:relative;z-index:100;font-size:2rem">&#xe60a;</i></span>
			<ul class="header_ul">
				<li>
					<ul class="li_ul">
						<li>
							<a href="javascript:history.go(-1)"><i class="iconfont icon-zuo"></i></a>
						</li>
						<li class="location">
							<span class="depart">北京</span>
							<span>-</span>
							<span class="terminus">上海</span>
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
		<div class="list_main">
			<listqwe></listqwe>
		</div>
		<v-hide></v-hide>
		<footer class="footer2">
			<ul>
				<li class="screen"><span>高级筛选</span></li>
				<li class="go_off"><span>出发时间</span></li>
				<li class="time_consuming"><span>旅行耗时</span></li>
				<li class="fares"><span>显示票价</span></li>
			</ul>
		</footer>
	</div>
</template>
<script>
	// import '../../../static/css/train/font/iconfont.css'
	// import '../../../static/css/trainTicket/style.css' 
	import '../../../static/css/trainTicket/list.css'
	
	// import '../../../static/js/train/list.js'
	import hide from './hide'
	import list from './list_li.vue'
	
	
	export default{
		name: 'list',
		components:{
			'v-hide':hide,
			'listqwe':list
		},
	    data () {
	      return {
	      	date:'17'
	      }

	    },
	    mounted:function(){
	      this.Hit();
	      this.time();
	      var list_main_ul = document.getElementsByClassName('list_main_ul')[0];
			var bootom = document.getElementsByClassName('footer2')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
			

				function scroll( fn ) { 
					var li_ul = document.getElementsByClassName('li_ul2')[0];
					var bottom = document.getElementsByClassName('footer2')[0];
				    var beforeScrollTop = document.body.scrollTop  
				    window.onscroll = function () {   
				        var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				            var delta = afterScrollTop - beforeScrollTop; 
				        if( delta === 0 ){
				        	 return false;
				        	}else if(delta > 0){
				        		bottom.style.bottom = -4+'rem';
								li_ul.style.top = -4+'rem';
				        	}else{
				        		bottom.style.bottom = 0+'rem';
								li_ul.style.top = 4+'rem';
				        	}
				        beforeScrollTop = afterScrollTop;  
				    }
				}  

				scroll();  
	    },
	    methods:{
	    	Hit:function(){
	    		var screen = document.getElementsByClassName('screen')[0];
	    		var hide = document.getElementsByClassName('hide')[0];
	    		var hide_main = document.getElementsByClassName('hide_main')[0];
	    		var cancel = document.getElementsByClassName('cancel')[0];
	    		screen.onclick = function(){
	    			hide.style.display = 'block'
	    			hide_main.style.bottom = 0+'rem'
	    		}
				cancel.onclick = function(){
	    			hide.style.display = 'none'
	    			hide_main.style.bottom = -23+'rem'
	    		}
	    	},
	    	time:function(){
	    		this.date = new Date().toLocaleDateString(); 
	    	}

	    }
	}
</script>