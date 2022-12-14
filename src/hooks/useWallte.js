import {
  ref, reactive, getCurrentInstance, toRefs,
} from 'vue';
import Web3, { utils } from 'web3';
import Web3Modal from 'web3modal';
import { getChainData } from '@/web3/tools';
import { providerOptions } from '@/web3/config';
import store from '@/store'

const INITIAL_STATE = {
  web3: null,
  provider: null,
  userAddress: '',
  connected: false,
  chainId: 1,
  networkId: 1,
};
export default function UseWallet() {
  try {
    const { ctx: _this } = getCurrentInstance();


    const walletObj = reactive({ ...INITIAL_STATE });
    const fetching = ref(false);
    const assets = ref(0);
    //https://github.com/Web3Modal/web3modal#web3modal
    const web3Modal = new Web3Modal({
      theme: 'dark',
      network: getChainData(walletObj.chainId).network,
      cacheProvider: true,
      providerOptions,
    });
    // methods wallte.js
    const resetApp = async () => {
      console.log("resetApp")
      const { web3 } = walletObj;
      if (web3 && web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
      }

      web3Modal.clearCachedProvider();
      assets.value = 0;
      Object.keys(INITIAL_STATE).forEach((e) => {
        walletObj[e] = INITIAL_STATE[e];
      });
      _this.$forceUpdate();
    };
    const getUserBalance = () => {
      if(walletObj.web3){
        return walletObj.web3.eth
        .getBalance(walletObj.userAddress)
        .then((res) => (res ? utils.fromWei(res.toString(), 'ether') : 0));
      }else{
        return 0
      }
      
    }

    const getAccountAssets = async () => {
      fetching.value = true;
      // get account balances

      assets.value = await getUserBalance();
    };
    const subscribeProvider = async (provider) => {
      if (!provider.on) {
        return;
      }
      provider.on('close', () => resetApp());
      provider.on('accountsChanged', async (accounts) => {
        // eslint-disable-next-line prefer-destructuring
        walletObj.userAddress = accounts[0];
        store.dispatch('setUserAddress', accounts[0].toLowerCase())
        await getAccountAssets();
      });
      provider.on('chainChanged', async (chainId) => {
        // console.log('333', chainId);
        const networkId = await walletObj?.web3?.eth?.net.getId();
        if(typeof(chainId)=='string'){
          chainId=parseInt(chainId, 16)
        }  
        walletObj.chainId = chainId;
        walletObj.networkId = networkId;

        store.dispatch('setChainId', chainId)
        
        await getAccountAssets();
      });
    };

    const onConnect = async () => {
      const provider = await web3Modal.connect();

      await subscribeProvider(provider);

      const web3 = new Web3(provider);
      
      const accounts = await web3.eth.getAccounts();

      const address = accounts[0];

      const networkId = await web3.eth.net.getId();

      let chainId = await web3.eth.getChainId(); // ?????? ???????????? chainId
      if(typeof(chainId)=='string'){
        chainId=parseInt(chainId, 16)
      }

      store.dispatch('setChainId', chainId)
      store.dispatch('setUserAddress', address.toLowerCase())
      store.dispatch('setWeb3Client', web3)

      walletObj.web3 = web3;
      walletObj.provider = provider;
      walletObj.connected = true;
      walletObj.userAddress = address;
      walletObj.chainId = chainId;
      walletObj.networkId = networkId;
      await getAccountAssets();
    };

    return {
      ...toRefs(walletObj),
      fetching,
      assets,
      resetApp,
      getAccountAssets,
      //
      web3Modal,
      // methods
      onConnect,
    };
  } catch (error) {
    console.log(error)
    return {
      ...toRefs(reactive({ ...INITIAL_STATE })),
    };  
  }

  
}
