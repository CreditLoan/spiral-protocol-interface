
import {UNISWAPV2_ROUTER_ABI} from "./abis"

import {QUICKSWAP_ROUTER,POLYGON_USDT} from "./constants"

import {getTokenDecimal} from "./erc20_api"


import store from '@/store'
// import Decimal from "decimal.js"
import { utils } from "ethers"


export const getTokenPrice= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(UNISWAPV2_ROUTER_ABI, QUICKSWAP_ROUTER)
	if(dc==0){
		dc =await getTokenDecimal(contractAddr)
	}
	
	
	let res=await contract.methods.getAmountsOut(utils.parseUnits("1",dc), [
    contractAddr,
    POLYGON_USDT.address,
  ]).call()
	console.log(res)
  if (res && res[1] > 0) {
    let price = res[1] / Math.pow(10, 6);
    return price;
  } else {
    return 0;
  }
}
