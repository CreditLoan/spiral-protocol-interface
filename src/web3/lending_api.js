import {  utils } from "ethers";

import {CTOKEN_ABI,COMPTROLLER_ABI} from "./abis"

import store from '@/store'
import Decimal from "decimal.js";
import {COMPTROLLER_ADDRESS} from "./constants"

import {getTokenPrice} from './swap_api'

export const getTotalBorrows= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	let totalBorrows=await contract.methods.totalBorrows().call()
	
	return utils.formatUnits(totalBorrows,dc)
}

export const getExchangeRateStored= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	let totalBorrows=await contract.methods.exchangeRateStored().call()
	
	return utils.formatUnits(totalBorrows,dc)
}

export const getTotalSupply= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	let totalBorrows=await contract.methods.totalSupply().call()
	
	return utils.formatUnits(totalBorrows,dc)
}

export const getSupplyApy= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	let supplyRatePerBlock=await contract.methods.supplyRatePerBlock().call()
	let supplyRatedc=new Decimal(supplyRatePerBlock).div(Math.pow(10, dc))
	
	return Math.pow(new Decimal('1').add(supplyRatedc),365*24*60*60/2)-1
}


export const getBorrowApy= async (contractAddr,dc)=> {
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	let borrowRatePerBlock=await contract.methods.borrowRatePerBlock().call()
	let borrowRatedc=new Decimal(borrowRatePerBlock).div(Math.pow(10, dc))
	
	return Math.pow(new Decimal('1').add(borrowRatedc),365*24*60*60/2)-1
}

export const getMintApy= async (ctokenAddr,underlyingAddr,underlyingDc)=> {
	const contract=new store.state.web3Client.eth.Contract(COMPTROLLER_ABI, COMPTROLLER_ADDRESS)
	let minedApr=await Promise.all([
		contract.methods.compSpeeds(ctokenAddr).call(),
		getTotalSupply(ctokenAddr,18),
		getExchangeRateStored(ctokenAddr,18),
		getTokenPrice(underlyingAddr,underlyingDc)
	]).then(([speedBig,totalSupply,exchangeRateStored,tokenPrice])=>{
		let speed=new Decimal(utils.formatUnits(speedBig,18))
		tokenPrice=new Decimal(tokenPrice)
		let marketTotalSupplyInTokenUnit= new Decimal(totalSupply).mul(new Decimal(exchangeRateStored))

		let apr = speed.mul(new Decimal(24 * 60 * 60 / 2)).mul(tokenPrice).mul(new Decimal("365")).div(marketTotalSupplyInTokenUnit.mul(tokenPrice))
		console.log("tokenPrice:",tokenPrice.toString())
		console.log("speed:",speed.toString())
		console.log("marketTotalSupplyInTokenUnit:",marketTotalSupplyInTokenUnit.toString())
		console.log("minedApr:",apr.toString())
		return apr.toString()
	})
	
	return minedApr
}

export const mint= async (contractAddr,amount,dc,userAddr)=> {
	let amountBig=utils.parseUnits(String(amount), Number(dc))
	const contract=new store.state.web3Client.eth.Contract(CTOKEN_ABI, contractAddr)
	return contract.methods.mint(amountBig).send({ from: userAddr });
}
