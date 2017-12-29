<template>
    <div>
        <!-- <input type="text" id="suggestId" name="address_detail" placeholder="如门牌号等" v-model="address_detail" class="input_style"> -->
        <div id="allmap" ></div>
    </div>
</template>

<script>
    import {MP} from '../../static/map.js'
    export default {
        data(){
            return{
                address_detail: null, //详细地址
                userlocation:{lng:"",lat:""},          
            }
        },
        mounted(){
                this.$nextTick(function(){
                    MP("mdWMSNGaFN1RrkRBX7PCIxDkvH2H05e2").then( BMap => {
                        var th = this;
                        var map = new BMap.Map("allmap");            // 创建Map实例
                        // var point = new BMap.Point(116.404, 39.915); // 创建点坐标
                        // map.centerAndZoom(point,15);
                        map.enableScrollWheelZoom();    //允许用户对地图进行缩放

                        // var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        //     {
                        //         "input" : "suggestId",
                        //         "location" : map
                        //     }
                        // )
                        // var myValue;
                        // ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                        //     var _value = e.item.value;
                        //     myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        //     this.address_detail = myValue;
                        //     console.log('我选的：'+myValue);
                        //     setPlace();
                        // });

                        th.address_detail = '广州市番禺区长隆欢乐世界';
                        setPlace();
                        function setPlace(){
                            map.clearOverlays();    //清除地图上所有覆盖物
                            function myFun(){
                                th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                                map.centerAndZoom(th.userlocation, 20);
                                map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
                            }
                            var local = new BMap.LocalSearch(map, { //智能搜索
                                onSearchComplete: myFun
                            });
                            local.search(th.address_detail);
                        }
                    })
                })
        }
    }
</script>

<style>
    .input_style{
        display: block;
        width:100%;
        font-size:30px;
        margin:20px 0;
        box-sizing: border-box;
        outline: none;
    }
</style>


