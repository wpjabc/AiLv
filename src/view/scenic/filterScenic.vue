<template>
  <div class="filter-container">
      <x-icon type="ios-close-empty" size="50" @click="$router.go(-1)"></x-icon>
      <div class="filter-head">
        <p class="filter-title">筛选</p>
      </div>
      
      <div class="filter">
          <p class="filter-type">类型</p>
           <checklist  label-position="left" :options="commonList" v-model="checklist002" @on-change="change"></checklist>
      </div>


      <footer >
            <div class="fixed-filter" @click="submitFilter">
                <x-button type="warn">确定</x-button>
            </div>
        </footer>
    
  </div>
</template>

<script>
    import { Checklist, XButton } from 'vux'
    import store from "@/store/store"
export default {
    
  components:{
      Checklist,
      XButton

  },
  store,
  data(){
        return{
          checklist002: [ '不限' ],
          commonList: [ '不限','游乐场', '公园', '城市观光','文化古迹','室内娱乐','展馆','温泉','自然风光' ],
          selectlist:[],

        }
      
  },
  methods:{
      change (val, label) {
          
        if(val.length >1){
           
            if(val.indexOf('不限') >= 0 ){
                val.shift();
            }
           
              
        }
        this.selectlist = val;
        console.log(this.selectlist)
      
    },
    submitFilter(){
        store.commit("setScenic",this.selectlist);
        this.$router.push({path:"/seeMore"})
    }

  }
}
</script>
<style>
.weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
    color:#07bb9f !important;
}
.filter-container .filter{
    padding-bottom: 8rem
}
.filter-title{
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 1.2rem;
    padding-bottom: 3rem;
    margin-left: 10px;
}
.filter .weui-cell::before{
    border:0 none !important ;
}
.filter .weui-cells::after{
    border:0 none !important ;
}
.filter-container .filter{
    margin:0 20px;
}
.filter-type{
    font-size: 1.2rem;
    margin-bottom: 1rem;
}
.filter-head{
    margin:0 10px;
}
</style>


