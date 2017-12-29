import vue from 'vue'
import vuex from 'vuex'


vue.use(vuex);

export default new  vuex.Store({
    state:{
        scenicURL:'',
    },
    mutations:{
        setaddress(state,address){
            state.scenicURL = address
            // console.log(address)
        },

        getaddress(state,callback){
           var url = state.scenicURL;
           console.log(url)
           callback(url);
        }
    }

})