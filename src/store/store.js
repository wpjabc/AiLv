import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        hotelEquipment:null, //将酒店设备定义为全局变量
        hotelOrder:1111,
        get:true,
        historyHotelOrderID:[],  //历史订单ID
        HistoryDataHotel:[],//历史酒店订单
        HistoryDataScenic:[],//历史景点订单
        foot_nav:0,
        hotelRoomType:[],
        scenicOrder:{},
        hotelType:['不限'],
        hotelPrice:'0',
        scenicList:[],
        add_user:[],
        ticket_order:1,
        scenicURL:'', //景点地址
        wishLoveHotel:[],  //心愿单收藏酒店
        wishLoveScenic:[],  //心愿单收藏景点
        userRegInfo:{          //用户注册信息
            name:'',
            phone:null,
            password:null
        },
        userInfo:{
            id:null,
            name:null
        }
    },
    mutations:{
        // 设置景点地址
        setaddress(state,address){
            state.scenicURL = address
            // console.log(address)
        },
        // 获取景点地址
        getaddress(state,callback){
           var url = state.scenicURL;
           console.log(url)
           callback(url);
        },
        setHotelEquipment(state,arr){
            state.hotelEquipment = arr;     //设置酒店设施
        },
        getHotelEquipment(state,callback=function(){}){
            var eq = state.hotelEquipment   //获取酒店设施
            callback(eq);    
        },

           // 酒店筛选
        setHotelList(state,obj){
            state.hotelType = obj.type;
            state.hotelPrice = obj.price;
        },
        // 预定酒店房间类型
        setHotelRoomType(state,arr){
            state.hotelRoomType = arr;  //设置房间类型
        },

        //完成订单信息
        setHotelOrder(state,obj){
            state.hotelOrder = obj;
        },
        getHotelOrder(state,callback=function(arg){}){
            callback(state.hotelOrder);
        },
        updateFooterNav(state,num){
            state.foot_nav = num;
        },
        //设置景点
        setScenic(state,arr){
            state.scenicList = arr;
        },
        setTicketOrder(state,obj){
            console.log(obj)
            state.scenicOrder = obj;
        },
        //火车票状态
        setAddUser(state,obj1){
            state.add_user.push(obj1);
            console.log("store:"+obj1)
        },
        //订单显示
        showTicketOrder(state,obj2){
            state.ticket_order = obj2;
        },
        //收藏酒店
        addWishLoveHotel(state,hotel){
            state.wishLoveHotel.push(hotel);
        },
        delWishLoveHotel(state,hotelId){
            for(let i=0;i<state.wishLoveHotel.length;i++){
                if(state.wishLoveHotel[i].hotelid==hotelId){
                    state.wishLoveHotel.splice(i,1);
                }
            };
        },
         //收藏景点
         addWishLoveScenic(state,Scenic){
            state.wishLoveScenic.push(Scenic);
        },
        delWishLoveScenic(state,hotelId){
            for(let i=0;i<state.wishLoveScenic.length;i++){
                if(state.wishLoveScenic[i].scenic_id==Id){
                    state.wishLoveScenic.splice(i,1);
                }
            };
        },
        // 酒店
        getHistoryData(state){
            axios.get('../../../static/json/wishList/hotel.json').then((res)=>{
                console.log(res.data.hotel);
                state.HistoryDataHotel = res.data.hotel;
            })
        },
        //景点
        getScenicData(state){
            axios.get('../../../static/json/wishList/experience.json').then((res)=>{
                console.log(res.data.exper);
                state.HistoryDataScenic = res.data.exper;
            })
        },
    }
})
