

// const contract = computed(
//   () => new web3.value.eth.Contract(USDT_API, USDT_ADDRESS),
// );
// function approve () {
//   return contract.value.methods
//     .approve(USDT_ADDRESS, utils.toHex(utils.toWei('1000000000000000000000000000', 'gwei')))
//     .send({ from: userAddress.value });
// }
import {  utils } from "ethers";

import {ERC20_ABI} from "./abis"

import store from '@/store'

export const approveMaxAmount="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

export const getBalanceOf= async (tokenAddr,userAddress)=> {
	const contract=new store.state.web3Client.eth.Contract(ERC20_ABI, tokenAddr)
	let balance=await contract.methods.balanceOf(userAddress).call()
	let dc= await getTokenDecimal(tokenAddr)
	
	return utils.formatUnits(balance,dc)
}

export const getTokenDecimal = async (tokenAddr) => {
  return new store.state.web3Client.eth.Contract(ERC20_ABI, tokenAddr).methods.decimals().call();
}



export const getSymbol= async (tokenAddr)=> {
	return new store.state.web3Client.eth.Contract(ERC20_ABI, tokenAddr).methods.symbol().call();
}


export const setApprove = async (tokenAddr,contractAddr,userAddr,amountIn)=> {
	// console.log("amountIn:",amountIn)
	// const aa=utils.toHex(amountIn)
	// console.log(aa)
	const contract=new store.state.web3Client.eth.Contract(ERC20_ABI, tokenAddr)
	return contract.methods.approve(contractAddr, amountIn).send({ from: userAddr });
}

export const getAllowance= async (tokenAddr,contractAddr,userAddr)=> {
	const contract=new store.state.web3Client.eth.Contract(ERC20_ABI, tokenAddr)
	return contract.methods.allowance(userAddr,contractAddr).call();
}
