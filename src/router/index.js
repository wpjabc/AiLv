import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

import Test from  '../view/test.vue'
// 首页
import Index from '../view/index/index.vue'
import indexSearch from '@/view/index/IndexSearch'
// 收件箱
import InboxDetail from  '../view/Inbox/InboxDetail.vue'
import Inbox from  '../view/Inbox/Inbox.vue'

//景点门票
import scenic from  '../view/scenic/scenic.vue'
import scenics from '../view/scenic/Scenics.vue'
import seeMore from '@/view/scenic/seeMore'
import map from '@/components/map'
import ticketType from '../view/scenic/ticketType'
import orderTicket from '@/view/scenic/orderTicket'
import submitOrder from '@/view/scenic/submitOrder'
import filterScenic from '@/view/scenic/filterScenic'
import FilterResult from '@/view/scenic/filterResult'

// 酒店列表相关页面
import Hotel from '@/view/hotel/hotel'
import HotelDetail from '@/view/hotel/hotelDetail'
import Equipment from '@/view/hotel/equipment'
import BMapComponent from '@/view/hotel/BMapComponent'
import ChooseRoom from '@/view/hotel/chooseRoom'
import Order from '@/view/hotel/order'
import ShowOrder from '@/view/hotel/showOrder'
import Filter from '@/view/hotel/filter'

// 注册登录相关页面
import RegisterName from '@/view/login_register/registerName'
import RegisterPhone from '@/view/login_register/registerPhone'
import RegisterPassword from '@/view/login_register/registerPassword'
import Member from '@/view/login_register/member'
import Login from '@/view/login_register/login'

//心愿单
import WishList from '../view/WishList/WishList'

// 个人中心页面
import Personpage from '../view/personalCenter/personpage'
import Inform from '../view/personalCenter/Inform'
import service from '../view/personalCenter/service'
import GetHelp from '../view/personalCenter/GetHelp'
import Feedback from '../view/personalCenter/Feedback'
import ProfileEditor from '../view/personalCenter/ProfileEditor'
import history from '../view/personalCenter/history'


//火车票页面
import chooseStation from '@/view/trainTicket/chooseStation'
import addUser from '@/view/trainTicket/add_user'
import trainTicketOrder from '@/view/trainTicket/train_ticket_order'
import showTrainOrder from '@/view/trainTicket/show_order'
import details from '@/view/trainTicket/details.vue'
import list from '@/view/trainTicket/list.vue'
import list_li from '@/view/trainTicket/list_li.vue'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      name: 'Hello',
      component: Index,
    },{
      path:'/indexSearch',
      component:indexSearch
    },
    {
      path: '/scenic',
      name: 'scenic',
      component: scenic,
    },
    {
      path: '/scenics',
      name: 'scenics',
      component: scenics
    },
    {
      path:'/Inbox',
      name:'Inbox',
      component:Inbox
    },
    {
      path:'/InboxDetail',
      name:'InboxDetail',
      component:InboxDetail
    },
    {
      path:'/member',
      name:'member',
      component:Member
    },
    {  //景点地图
      path:'/map',
      name:"map",
      component:map
    },
    { // 景点票类型
      path:'/ticketType',
      name:'ticketType',
      component:ticketType

    },
    {   //景点查看更多
      path:'/seeMore',
      name:"seeMore",
      component:seeMore
    },
    {  //门票预订
      path:'/order-ticket',
      component:orderTicket
    },
    {  //提交景点门票订单
      path:'/submit-order',
      component:submitOrder
    },
    {  //景点筛选
      path:'/filter-scenic',
      component:filterScenic
    },
    { //酒店列表路由
      path: '/hotel',
      name: 'Hotel',
      component: Hotel
    },
    { //酒店详细页路由
      path:'/hotelDetail',
      name:"HotelDetail",
      component:HotelDetail
    },
    { //酒店设施
      path:"/hotelDetail/equip",
      name:"Equipment",
      component:Equipment
    },
    { //酒店地图
      path:"/hotelDetail/map",
      name:"BMapComponent",
      component:BMapComponent
    },
    { //选择房型
      path:"/hotelDetail/chooseRoom",
      name:"ChooseRoom",
      component:ChooseRoom
    },
    { //订单页
      path:"/hotelDetail/order",
      name:"Order",
      component:Order
    },
    { //完成订单页
      path:"/hotelDetail/showOrder",
      name:"ShowOrder",
      component:ShowOrder
    },
    { //筛选
      path:"/filter",
      name:"Filter",
      component:Filter
    },
    { //注册（姓名）
      path:"/regname",
      name:"RegisterName",
      component:RegisterName
    },
    { //注册（手机）
      path:"/regphone",
      name:"RegisterPhone",
      component:RegisterPhone
    },
    { //注册（密码）
      path:"/regpassword",
      name:"RegisterPassword",
      component:RegisterPassword
    },
    { //登录注册首页
      path:"/memeber",
      name:"Member",
      component:Member
    },
    { //登录
      path:"/login",
      component:Login
    },
    {
      path: '/lovehotel',
      redirect:'/lovehotel/1',
      name: 'wishlist',
      component:WishList,
      children:[
        {
          path:'/lovehotel/:datahote',
          name:'lovehotel',
          component:resolve => require(['../components/wishList/LoveHotel'], resolve)
        },
        {
          path:'/experience/:dataExpr',
          name:'experience',
          component:resolve => require(['../components/wishList/Experience'], resolve)
        },
      ]
    },
    {
      path:'/personpage',
      name:'personpage',
      component:Personpage
    },
    {
      path:'/inform',
      name:'inform',
      component:Inform
    },
    {
      path:'/informconten',
      name:'informconten',
      component:resolve => require(['../components/personalCenter/Informconten'], resolve)
    },
    {
      path:'/lovehote.1/:datahote',
      name:'history',
      component:history,
      children:[
        {
          path:'/lovehote.1/:datahote',
          name:'lovehote.1',
          component:resolve => require(['../components/personalCenter/LoveHote.1'], resolve)
        },
        {
          path:'/experience.1/:dataExpr',
          name:'experience.1',
          component:resolve => require(['../components/personalCenter/Experience.1'], resolve)
        },
        {
          path:'/historyRailway/:dataExpr',
          name:'historyRailway',
          component:resolve => require(['../components/personalCenter/historyRailway'], resolve)
        },
       
      ]
    },
    {
      path:'/service',
      name:'service',
      component:service
    },
    {
      path:'/getHelp',
      name:'getHelp',
      component:GetHelp,
    },
    {
      path:'/getHelpconten/:index',
      name:'getHelpconten',
      component:resolve => require(['../components/personalCenter/getHelpconten'], resolve)
    },
    {
      path:'/feedback',
      name:'feedback',
      component:Feedback
    },
    {
      path:'/profileEditor',
      name:'profileEditor',
      component:ProfileEditor
    },
     {  //火车票选站
      path:'/chooseStation',
      component:chooseStation
    },
    {   //火车票添加乘客
      path:'/addUser',
      component:addUser
    },
    {    //火车票订单页
      path:'/trainTicketOrder/:seat/:id',
      component:trainTicketOrder
    },
    {      //最后订单显示页
      path:'/showTrainOrder',
      component:showTrainOrder
    },
    {    //火车列表
       path:'/list',
      component:list
    },
    {    //被选中的火车详细信息
       path:'/details',
      component:details
    }
  ]
})
