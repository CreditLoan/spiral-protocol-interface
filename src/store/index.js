import { createStore } from "vuex";
import getters from './getters'

const store= createStore({
  state: {
    "web3Client": null,
    "userAddress":"",
    "chainId":0,
    "slipValue":0,
  },
  getters,
  mutations: {
    getChainId(state, newValue){
      state.chainId = newValue
    },
    getSlipValue(state, newValue){
      state.slipValue = newValue
    },
    getUserAddress(state, newValue){
      state.userAddress = newValue
    },
    getWeb3Client(state, newValue){
      state.web3Client = newValue
    }
  },
  actions: {
    setChainId(context, value){
      context.commit('getChainId',value)
    },
    setSlipValue(context, value){
      context.commit('getSlipValue',value)
    },
    setUserAddress(context, value){
      context.commit('getUserAddress',value)
    },
    setWeb3Client(context, value){
      context.commit('getWeb3Client',value)
    },
  },
  modules: {},
});
export default store
