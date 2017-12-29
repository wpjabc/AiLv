<template>
	<div class="station">
		<header >
			<div class="headerTop">
				<span @click="$router.go(-1)"><i class="iconfont" @click="$router.go(-1)">&#xe60a;</i></span>
				<span class="startOrEndStation">始发站</span>
				<span><router-link to="list">确定&nbsp;</router-link></span>
			</div>
			<div class="headerBottom">
				<span>
					<input onfocus="this.blur();" class="startStation" type="text" value="广州">
					<span class="clearStationBtn"><i class="iconfont">&#xe617;</i></span>
				</span>
				<span>
					<input onfocus="this.blur();" class="endStation" type="text" value="深圳">
					<span class="clearStationBtn" data="1"><i class="iconfont">&#xe617;</i></span>
				</span>
			</div>
		</header>
		<div class="content">
			<div id="quickFind">
				<p class="stationItem" @click="letterTouch($event)" v-for="letter in letterData" data="">{{letter}}</p>
			</div>
			<div class="oftenUseCity">
				<p>常用城市</p>
				<div class="cityContent">
					<span class="cityContentLists" @click="selectStation($event, 0)">广州</span>
					<span class="cityContentLists" @click="selectStation($event, 0)">北京</span>
					<span class="cityContentLists" @click="selectStation($event, 0)">深圳</span>
				</div>
			</div>
			<div class="hotCity">
				<p>热门城市</p>
				<div class="cityContent">
					<span class="cityContentLists" v-for="stationData in hotStationData" @click="selectStation($event, 1)">{{stationData}}</span>
				</div>
			</div>
			<div class="stationLists">
				<p v-on:click="showStations">车站列表：     A-Z</p>
				<div class="stationLists stationListContent"></div>
			</div>
		</div>
		<div class="letterNotice"></div>
	</div>
</template>

<style>
	@import url('../../../static/css/trainTicket/chooseStation.css');
</style>

<script>
import JQ from '../../../static/js/jquery-3.2.1.min.js'
import stationName from '../../../static/js/trainTicket/stationName.js'
import Vue from "vue"

var letterReg = /[a-z]/g;
var letterArr = ['常用','热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var hotStationArr = ['广州','深圳','上海','北京','重庆','天津','武汉'];
var stationEleArr = [];		//存放所有车站数据，包括标签

//存放按首字母分组的所有车站数据(后面会转化为二维数组，再将分组数据遍历进去),包含标签
var groupCnNameArr = [];			

var stationListContent;
setTimeout(function(){
	stationListContent = document.getElementsByClassName('stationListContent');
},50);

var tempLetterArr = letterArr.slice(2,letterArr.length+1);		//存放英文字母a-z
// console.log(stationListContent[0])
//始发站、目的站选中标志
var startStationIsClick = 'yes' || 'no';	
var endStationIsClick = 'no';

	export default {
		name: 'station',
		data() {
			return {
				msg: '选择车站',
				letterData: letterArr,
				hotStationData: hotStationArr,
				stationListsData: []
			}
		},
		methods: {
			showStations: function(){

				var stationListContent = document.getElementsByClassName('stationListContent');
				let stationLists = document.getElementsByClassName('stationLists');
				let stationListsTitle = stationLists[0].getElementsByTagName('p');

				stationListsTitle[0].innerHTML = '车站列表：     A-Z';
				stationListContent[0].innerHTML = '';
				stationListContent[0].innerHTML = stationListsEle;
				
				var startStation = document.getElementsByClassName('startStation');
				var endStation = document.getElementsByClassName('endStation');
				let cityContentLists = document.getElementsByClassName('cityContentLists');
				let stationListsItem = stationListContent[0].getElementsByTagName('span');
				
				// 将当前选中的火车站异色显示，并且替换到始发站或目的站
				for(var i=0; i<stationListsItem.length; i++){

					stationListsItem[i].style.color = '#000';
					stationListsItem[i].style.background = '';
					stationListsItem[i].style.boxShadow = '';

					stationListsItem[i].onclick = function(){
						for(var i=0; i<cityContentLists.length; i++){

							cityContentLists[i].style.color = '#000';
							cityContentLists[i].style.background = '';
							cityContentLists[i].style.boxShadow = '';
						}
						for(var i=0; i<stationListsItem.length; i++){

							stationListsItem[i].style.color = '#000';
							stationListsItem[i].style.background = '';
							stationListsItem[i].style.boxShadow = '';
						}

						this.style.color = '#1f78bf';
						this.style.borderRadius = '16px';
						this.style.background = '#eee';
						this.style.boxShadow = 'rgba(0, 103, 185, 0.3) 0px 0px 13px inset';

						if(startStationIsClick == 'yes'){

							startStation[0].value = this.innerHTML;

						}else if(endStationIsClick == 'yes'){

							endStation[0].value = this.innerHTML;
						}
					}
				}
			},
			letterTouch: function(event){
				var station = document.getElementsByClassName('station');
				var startStation = document.getElementsByClassName('startStation');
				var endStation = document.getElementsByClassName('endStation');
				var letterNotice = document.getElementsByClassName('letterNotice');
				let stationItem = document.getElementsByClassName('stationItem');
				let content = document.getElementsByClassName('content');
				let stationLists = document.getElementsByClassName('stationLists');
				let stationListsTitle = stationLists[0].getElementsByTagName('p');
				let cityContentLists = document.getElementsByClassName('cityContentLists');
				let stationListsItem = stationListContent[0].getElementsByTagName('span');

				let thisInnerHTML = event.target.innerHTML;			//当前按下的字母

				stationListContent[0].innerHTML = '';
				this.stationListsData.length = 0;
				for(var j=0; j<stationItem.length; j++){

					stationItem[j].style.color = '#999';
					stationItem[j].style.fontWeight = '';
				}
				stationListsTitle[0].innerHTML = '车站列表：     ' + thisInnerHTML;

				// 显示当前点击的字母 对应的首字母的火车站
				for(var i=0; i<tempLetterArr.length; i++){

					if(thisInnerHTML == tempLetterArr[i][0]){

						stationListContent[0].innerHTML = groupCnNameArr[i].join(" ");
						event.target.style.color = '#1f78bf';
						event.target.style.fontWeight = 'bold';
					}

					// console.log(tempLetterArr[i]);
				}

				// 提示当前按下的字母
				letterNotice[0].style.display = 'block';
				letterNotice[0].innerHTML = thisInnerHTML;

				setTimeout(function(){
					letterNotice[0].style.display= 'none';
				},2000);

				// 将当前选中的火车站异色显示，并且替换到始发站或目的站
				for(var i=0; i<stationListsItem.length; i++){

					stationListsItem[i].style.color = '#000';
					stationListsItem[i].style.background = '';
					stationListsItem[i].style.boxShadow = '';

					stationListsItem[i].onclick = function(){
						for(var i=0; i<cityContentLists.length; i++){

							cityContentLists[i].style.color = '#000';
							cityContentLists[i].style.background = '';
							cityContentLists[i].style.boxShadow = '';
						}
						for(var i=0; i<stationListsItem.length; i++){

							stationListsItem[i].style.color = '#000';
							stationListsItem[i].style.background = '';
							stationListsItem[i].style.boxShadow = '';
						}

						this.style.color = '#1f78bf';
						this.style.borderRadius = '16px';
						this.style.background = '#eee';
						this.style.boxShadow = 'rgba(0, 103, 185, 0.3) 0px 0px 13px inset';

						if(startStationIsClick == 'yes'){
							startStation[0].value = this.innerHTML;

						}else if(endStationIsClick == 'yes'){

							endStation[0].value = this.innerHTML;
						}
					}
				}

				// 触屏滑动字母索引
				var quickFind = document.getElementById('quickFind');

				quickFind.addEventListener("touchstart", letterTouchStart);
				quickFind.addEventListener("touchmove", letterTouchMove);
				quickFind.addEventListener("touchend", letterTouchEnd);

				function letterTouchStart(e){

					var e = e.changedTouches[0];
					// console.log('START:', e.pageY);
				}

				function letterTouchMove(e){

					content[0].style.height = '80%';
					content[0].style.overflow = 'hidden';

					let nowX =  screen.width-20;
					let nowY = e.touches[0].clientY > screen.height ? screen.height-20 : e.touches[0].clientY;

					var letterNow = document.elementFromPoint(nowX, nowY);

					var letterNowInnerHTML = letterNow.innerText;
					stationListsTitle[0].innerHTML = '车站列表：     ' + letterNowInnerHTML;
					// console.log(letterNowInnerHTML);

					for(var j=0; j<stationItem.length; j++){

						stationItem[j].style.color = '#999';
						stationItem[j].style.fontWeight = '';
					}
					// console.log(tempLetterArr);

					for(var i=0; i<tempLetterArr.length; i++){

						stationListContent[0].innerHTML = groupCnNameArr[tempLetterArr.indexOf(letterNowInnerHTML)].join(" ");

						letterNow.style.color = '#1f78bf';
						letterNow.style.fontWeight = 'bold';
						
						// console.log(letterNow.innerHTML);

						// console.log(groupCnNameArr[tempLetterArr.indexOf(letterNowInnerHTML)].join(" "));
						// console.log(stationListContent[0].innerHTML);
					}

					// 突出显示当前字母
					letterNotice[0].style.display = 'block';
					letterNotice[0].innerHTML = letterNowInnerHTML;

					setTimeout(function(){
						letterNotice[0].style.display= 'none';
					},2000);
					
					// 将当前选中的火车站异色显示，并且替换到始发站或目的站
					for(var i=0; i<stationListsItem.length; i++){

						stationListsItem[i].style.color = '#000';
						stationListsItem[i].style.background = '';
						stationListsItem[i].style.boxShadow = '';

						stationListsItem[i].onclick = function(){
							for(var i=0; i<cityContentLists.length; i++){

								cityContentLists[i].style.color = '#000';
								cityContentLists[i].style.background = '';
								cityContentLists[i].style.boxShadow = '';
							}
							for(var i=0; i<stationListsItem.length; i++){

								stationListsItem[i].style.color = '#000';
								stationListsItem[i].style.background = '';
								stationListsItem[i].style.boxShadow = '';
							}

							this.style.color = '#1f78bf';
							this.style.borderRadius = '16px';
							this.style.background = '#eee';
							this.style.boxShadow = 'rgba(0, 103, 185, 0.3) 0px 0px 13px inset';

							if(startStationIsClick == 'yes'){
								startStation[0].value = this.innerHTML;

							}else if(endStationIsClick == 'yes'){

								endStation[0].value = this.innerHTML;
							}
						}
					}
					
				}

				function letterTouchEnd(e){

					var e = e.changedTouches[0];

					// console.log('END: ', e.pageY);

					content[0].style.height = '100%';
					content[0].style.overflow = '';

				}

			},
			selectStation: function(event, list){

				let cityContentLists = document.getElementsByClassName('cityContentLists');
				let stationLists = document.getElementsByClassName('stationLists');
				let stationListsItem = stationLists[0].getElementsByTagName('span');
				let startStation = document.getElementsByClassName('startStation');
				let endStation = document.getElementsByClassName('endStation');

				for(var i=0; i<stationListsItem.length; i++){

					stationListsItem[i].style.color = '#000';
					stationListsItem[i].style.background = '';
					stationListsItem[i].style.boxShadow = '';
				}

				for(var i=0; i<cityContentLists.length; i++){

					cityContentLists[i].style.color = '#000';
					cityContentLists[i].style.background = '';
					cityContentLists[i].style.boxShadow = '';
				}
				for(var i=0; i<stationListsItem.length; i++){

					stationListsItem[i].style.color = '#000';
					stationListsItem[i].style.background = '';
					stationListsItem[i].style.boxShadow = '';
				}
				
				event.target.style.color = '#0067b9';
				event.target.style.borderRadius = '16px';
				event.target.style.background = '#eee';
				event.target.style.boxShadow = 'rgba(0, 103, 185, 0.3) 0px 0px 13px inset';

				if(startStationIsClick == 'yes'){
					startStation[0].value = event.target.innerHTML;

				}else if(endStationIsClick == 'yes'){

					endStation[0].value = event.target.innerHTML;
				}
				
			}
		},
		mounted() {
			setTimeout(function(){
				var station = document.getElementsByClassName('station');
				var startStation = document.getElementsByClassName('startStation');
				var endStation = document.getElementsByClassName('endStation');
				var stationListContent = document.getElementsByClassName('stationListContent');

				let height = window.innerHieght | screen.height;
				setTimeout(function(){
					station[0].style.height = height + 'px';
				},70)
				console.log(station);

				console.log(stationEleArr);
                var tempStationList = [];

				// 页面加载完成即显示所有火车站
				setTimeout(function(){
                    for(var i=0; i<stationEleArr.length/5; i++){
                        stationListContent[0].innerHTML += stationEleArr[i];
                    }
				},20)
				
				var startOrEndStation = document.getElementsByClassName('startOrEndStation');
				var clearStationBtn;
				setTimeout(function(){
					clearStationBtn	= document.getElementsByClassName('clearStationBtn');
					clearStationBtn[0].style.transform = 'scale(1)';
					clearStationBtn[1].style.transform = 'scale(0)';

					// 判断当前选中的是 始发站 还是目的站
					startStation[0].onclick = function(){

						startOrEndStation[0].innerHTML = '始发站';

						startStation[0].parentNode.style.flex = '1.5';
						endStation[0].parentNode.style.flex = '1';

						startStation[0].style.color = '#0067b9';
						startStation[0].style.background = '#fff';

						endStation[0].style.color = '#555';
						endStation[0].style.background = '#eee';

						startStationIsClick = 'yes';
						endStationIsClick = '';

						clearStationBtn[0].style.transform = 'scale(1)';
						clearStationBtn[1].style.transform = 'scale(0)';
					};

					endStation[0].onclick = function(){

						startOrEndStation[0].innerHTML = '目的站';
						
						endStation[0].parentNode.style.flex = '2';

						endStation[0].style.color = '#0067b9';
						endStation[0].style.background = '#fff';

						startStation[0].style.color = '#555';
						startStation[0].style.background = '#eee';

						endStationIsClick = 'yes';
						startStationIsClick = '';

						clearStationBtn[0].style.transform = 'scale(0)';
						clearStationBtn[1].style.transform = 'scale(1)';
					};

					let cityContentLists = document.getElementsByClassName('cityContentLists');
					let stationListsItem = stationListContent[0].getElementsByTagName('span');
					
					// 将当前选中的火车站异色显示，并且替换到始发站或目的站
					for(var i=0; i<stationListsItem.length; i++){

						stationListsItem[i].style.color = '#000';
						stationListsItem[i].style.background = '';
						stationListsItem[i].style.boxShadow = '';

						stationListsItem[i].onclick = function(){
							for(var i=0; i<cityContentLists.length; i++){

								cityContentLists[i].style.color = '#000';
								cityContentLists[i].style.background = '';
								cityContentLists[i].style.boxShadow = '';
							}
							for(var i=0; i<stationListsItem.length; i++){

								stationListsItem[i].style.color = '#000';
								stationListsItem[i].style.background = '';
								stationListsItem[i].style.boxShadow = '';
							}

							this.style.color = '#1f78bf';
							this.style.borderRadius = '16px';
							this.style.background = '#eee';
							this.style.boxShadow = 'rgba(0, 103, 185, 0.3) 0px 0px 13px inset';

							if(startStationIsClick == 'yes'){

								startStation[0].value = this.innerHTML;

							}else if(endStationIsClick == 'yes'){

								endStation[0].value = this.innerHTML;
							}
						}
					}

					// 点击 起始站的‘x‘
					clearStationBtn[0].onclick = function(){

						startStation[0].value = '请重新选择';
					}
					// 点击 目的站的‘x‘
					clearStationBtn[1].onclick = function(){

						endStation[0].value = '请重新选择';
					}
				},50);	
				
					window.addEventListener("scroll",scrollFunction);
					function scrollFunction(){
                    if(location.href.indexOf('chooseStation') > -1){
						let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						let cityContent = document.getElementsByClassName('cityContent');
						let hotCity = document.getElementsByClassName('hotCity')[0].getElementsByTagName('p');
						let stationLists = document.getElementsByClassName('stationLists')[0].getElementsByTagName('p');

						// console.log(scrollTop);
						if(scrollTop >= 112){

							hotCity[0].style.position = 'fixed';
							hotCity[0].style.top = '0';
							hotCity[0].style.marginTop = '6rem';

							cityContent[1].style.marginTop = '20px';

							if(scrollTop >= 214){

								stationLists[0].style.position = 'fixed';
								stationLists[0].style.top = '0';
								stationLists[0].style.marginTop = '6rem';
							}else {

								stationLists[0].style.position = 'relative';
								stationLists[0].style.top = '0';
								stationLists[0].style.marginTop = '0';
							}
						}else {

							hotCity[0].style.position = 'relative';
							hotCity[0].style.top = '0';
							hotCity[0].style.marginTop = '0';
						}
					}
				}
				

			},1);
			
		}
	}

var stationNameArr = stationName.split('@');	//存放车站数据的数组
var cnName = [];								//存放分组好的所有车站的数组
var stationListsEle = {};


// 每个火车站的数组，先将内容分开(转成字符串)，再转成数组，然后后面再按字母a-z的顺序
for(var i=0; i<stationNameArr.length; i++){

    cnName.push(stationNameArr[i].split('|'));
    // console.log(stationNameArr[i].split('|'));

    cnName.join(' ');

    // console.log(cnName[i][0].split(' ')[0][0]);
}

// console.log(cnName);

var tempCnName = cnName.reverse();

// console.log('groupCnNameArr: 旧 ', groupCnNameArr);

// 将数组转化成二维数组，方便将后面内容分开
for(var i=0; i<tempLetterArr.length; i++){

    groupCnNameArr.push([]);
}
// 将不同首字母的火车站分开
for(var i=0; i<tempLetterArr.length; i++){

    for(var j=0; j<cnName.length; j++){
        
        if(cnName[j][0].split(' ')[0][0] == tempLetterArr[i].toLowerCase()){

            groupCnNameArr[i].unshift('<span>' + cnName[j][1] + '</span>');
            
        }
    }
}

// console.log('groupCnNameArr: ', groupCnNameArr);

cnName.sort();
// 给所有车站数据加上标签，格式化显示效果	
for(var i=0; i<stationNameArr.length; i++){

    if(letterReg.exec(cnName[i][0].split(" ")[0][0]) && cnName[i][0].length > 0){

        stationEleArr.push('<span>' + cnName[i][1] + '</span>');
    }

    // console.log('cnName[i][0].split("")[0]: ', cnName[i][0].split(' ')[0]);
}

// console.log('stationEleArr: ', stationEleArr);

// 将所有车站的中文名转化成字符串（包括标签），方便大数据量的快速输出
stationListsEle = stationEleArr.join(" ");
</script>