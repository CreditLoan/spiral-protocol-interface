import  {BscCommonToken,HecoCommonToken}from "@/const/token"
import store from '../store'

import  {symbol,tokenDecimal} from "@/web3/erc20_api"

export const QueryToken= async (searchInput)=>{
	let tokenList=[]
	const chainId=  store.getters.chainId
	if(chainId===56){
		tokenList=[...BscCommonToken]
	}
	if(chainId===128){
		tokenList=[...HecoCommonToken]
	}
	// 0x16835bbcd1f998eeb96fdddca04c42805c8de368	// 
	let cacheToken=JSON.parse(window.localStorage.getItem("tokens"+store.getters.chainId))
	if(cacheToken!=null){
		tokenList=[...tokenList,...cacheToken]
	}else{
		cacheToken=[]
	}
	let res= tokenList.filter(item=>item.name.toLowerCase().search(searchInput.toLowerCase())!=-1 || item.address.toLowerCase()==searchInput.toLowerCase())
	if(res!=null && res.length!=0){
		res.sort(function(a,b){
			return a.name>b.name ? 1 : -1
		})
		return res
	}else{
		if(searchInput.length==42){
			const [name,dc] = await Promise.all([
				symbol(searchInput),
				tokenDecimal(searchInput)
			]);


			let token={
				address:searchInput,
				name:name,
				dc:Number(dc),
				logo:"",
			}
		
			cacheToken=[token]
			window.localStorage.setItem("tokens"+store.getters.chainId,JSON.stringify(cacheToken))
			return [token]
		}else{
			return null
		}
		
	}
}

export const GetAllToken=async ()=>{
	let tokenList=[]

	if(store.getters.chainId==56){
		tokenList=[...BscCommonToken]
	}
	if(store.getters.chainId==128){
		tokenList=[...HecoCommonToken]
	}	
	let cacheToken=JSON.parse(window.localStorage.getItem("tokens"+store.getters.chainId))
	if(cacheToken!=null){
		tokenList=[...tokenList,...cacheToken]
	}
	tokenList.sort(function(a,b){
		return a.name>b.name ? 1 : -1
	})
	return tokenList
}


