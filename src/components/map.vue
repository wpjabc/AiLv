<template>
  <div>
      <header class="map-title">
          <x-icon type="ios-close-empty" size="50" @click="$router.push({path:'/scenic'})"></x-icon>
          <span class="map-location">位置</span>
      </header>
       
      <div id="map" ></div>
  </div>
</template>
<style>
    #map{
        width: 100%;
        height: 50em;
    }
    .map-title{
        display: flex;

    }
    .map-location{
        align-self: center;
        font-size: 1.2rem;
        margin-left:20px;
    }
</style>

<script>
import vuex from '@/store/store.js'
export default {
  data(){
      return{
          address:'',
      }
  },
    store:vuex,
    // computed:{
    //     getaddress(){
    //         this.address = vuex.state.scenicURL;
    //     }
        
    // },
  mounted(){
      
      vuex.commit('getaddress',function(url){

        var map = new BMap.Map('map');
      var point = new BMap.Point(116.404, 45.915);
      map.centerAndZoom(point, 30);
      map.enableScrollWheelZoom(true);
      var myGeo = new BMap.Geocoder();
      var local = new BMap.LocalSearch(map, {   
             
            renderOptions:{map: map}      
      });      
        local.search(url);
     
     })
      
      
  }
}
</script>
