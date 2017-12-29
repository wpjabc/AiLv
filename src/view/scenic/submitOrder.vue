<template>
  <div class="submit">
      <header>
          <x-icon type="ios-close-empty" size="50" @click="$router.push({path:'/scenics'})"></x-icon> 
      </header>
      <div class="submit-order">
          <div >
              <p class="submit-title">
                  订单信息
              </p>
          </div>
            <group>
               
                <cell-form-preview :list="list"></cell-form-preview>
                <cell :title="'总计'" :value="(total)"></cell>
            </group>

      </div>
    
  </div>
</template>



<script>
import { CellFormPreview, Group, Cell } from 'vux'
import store from '@/store/store.js'

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data () {
    return {
      list: [],
      total:''
    }
  },
  store,
    mounted(){
      console.log(store.state.scenicOrder)
      this.list = [{
        label: store.state.scenicOrder.ticket,
        value: '￥'+store.state.scenicOrder.ticketsTotal
      }, {
        label: '门票数量',
        value: store.state.scenicOrder.ticketNumber
      }, {
        label: '游玩日期',
        value: store.state.scenicOrder.ticketDate
      }],
      this.total='￥'+store.state.scenicOrder.ticketsTotal;

 
        // 异步获取酒店信息
        this.$ajax.get('../../static/json/scenic/scenics.json')
        .then(res => {
            var data = res.data.data;
            console.log(data);
            for(let i=0;i<data.length;i++){
              for(let j=0;j<data[i].scenics.length;j++){
                // console.log(data[i].scenics)
                  if(this.$route.query.id==data[i].scenics[j].scenic_id){
                    store.state.HistoryDataScenic.push(data[i].scenics[j]);
                  }
              }
            }
        });

    }

}
</script>

<style>
.submit-title{
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 60px;
    padding-bottom: 80px;
    margin:0 20px;
}
.submit-order .weui-form-preview__item{
    padding:0.5rem 0;
}
.submit-order .weui-cell:before{
    border-top: 0 none;
}
.submit-order .vux-label{
    color: red
}
</style>

