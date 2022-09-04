<template>
<div>
	<div class="poolList">
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="资产" width="100" />
			<el-table-column prop="supplyApy" label="存款收益" width="130" />
			<el-table-column prop="borrowApy" label="借款成本" width="130"/>
			<el-table-column prop="liquidity" label="流动性" width="130"/>
			<el-table-column prop="totalBorrows" label="借出总额" width="130"/>
			<el-table-column prop="totalSupply" label="总供给" width="130"/>
			<el-table-column prop="assetUsage" label="使用率" width="130"/>
			<el-table-column label="操作" width="130">
				<template #default="scope">
					<el-button type="text" size="small" @click="deposit(scope.row)">存款</el-button>
					<el-button type="text" size="small" @click="cancelOrder(scope.row.address)">借款</el-button>
				</template>
			</el-table-column>
		</el-table>
		<ApprovePage :style="{display: approveDialog ? 'block': 'none'}"  :closeFunc="closeApprovePage" :tokenAddress="currentCToken.underlyingAddress" :tokenName="currentCToken.name" :tokenDecimals="currentCToken.underlyingDecimals" :contractAddress="currentCToken.cTokenAddress"/>
		<DepositPage :style="{display: depositDialog ? 'block': 'none'}"  :closeFunc="closeDepositPage" :totalBalance="currentTokenBalance" :tokenAddress="currentCToken.underlyingAddress" :tokenName="currentCToken.name" :tokenDecimals="currentCToken.underlyingDecimals" :contractAddress="currentCToken.cTokenAddress"/>
		
	</div>
 
</div>
 
</template>

<script setup >
import {  onMounted,watch,ref } from 'vue'
import { getTotalBorrows,getSupplyApy,getBorrowApy} from '@/web3/lending_api'
import { getBalanceOf ,getAllowance}from '@/web3/erc20_api'
import { LENDING_CONTRACT } from '@/web3/constants'
import { useStore } from 'vuex'
import Decimal from "decimal.js";

import ApprovePage from '@/views/pages/trading-child/approve.vue'
import DepositPage from '@/views/pages/trading-child/deposit.vue'

import { utils } from "ethers";

const $store = useStore()

watch(() => $store.state.chainId, (val, old) => {
		console.log(val, old)
		// tableData= [{"name":2}]

		getInfo()
});


onMounted(async () => {
	// let aa=await getTotalBorrows("0x7280faec8c4a6abbb3414e31015ac108113363a4",18)
	// console.log(INITIAL_STATE.userAddress)
  // getAccountAssets()
});

let approveDialog=ref(false)
let depositDialog=ref(false)
let currentTokenBalance=ref("")
let currentCToken=ref({
	name: "",
	cTokenAddress:"",
	underlyingAddress:"",
	isChainCoin: false,
	cTokenDecimals:"",
	underlyingDecimals:"",
})

const deposit=(item)=>{

	currentCToken.value=item
	checkAllowance().then((isApproved) => {
		if(!isApproved){
			approveDialog.value=true
		}else{
			console.log("已经授权")
			depositDialog.value=true
			getBalanceOf(currentCToken.value.underlyingAddress,$store.state.userAddress).then((balance) => {
        currentTokenBalance.value=balance
      })
		}
	}).finally(() => {
		
	});

	
}
const closeApprovePage=()=>{
	approveDialog.value=false
}
const closeDepositPage=()=>{
	depositDialog.value=false
}

const checkAllowance =async() =>{
	let allowAmount = await getAllowance(currentCToken.value.underlyingAddress, currentCToken.value.cTokenAddress, $store.state.userAddress)
	// let maxAmount = utils.formatUnits(String(approveMaxAmount), 0)
	allowAmount = utils.formatUnits(allowAmount, currentCToken.value.underlyingDecimals)
	
	return allowAmount>"1"

}

let tableData=ref([])

const getInfo = async () => {
  try {
		// let a= await getMintApy(LENDING_CONTRACT[1].cTokenAddress,LENDING_CONTRACT[1].underlyingAddress,LENDING_CONTRACT[1].underlyingDecimals)
		// console.log("1:",a)
		for(let i=0;i<LENDING_CONTRACT.length;i++){
			let item=LENDING_CONTRACT[i]
			Promise.all([
				getTotalBorrows(item.cTokenAddress,item.underlyingDecimals),
				getBalanceOf(item.underlyingAddress,item.cTokenAddress),
				getSupplyApy(item.cTokenAddress,item.cTokenDecimals),
				getBorrowApy(item.cTokenAddress,item.cTokenDecimals),
				]).then(([
					totalBorrows,
					liquidity,
					supplyApy,
					borrowApy,
				])=>{
					let totalSupply=new Decimal(liquidity).add(new Decimal(totalBorrows)).toFixed(8)
					let assetUsage=Number(totalBorrows)/(Number(totalBorrows)+Number(liquidity))
					tableData.value.push({
					name: item.name,
					cTokenAddress:item.cTokenAddress,
					underlyingAddress:item.underlyingAddress,
					cTokenDecimals:item.cTokenDecimals,
					isChainCoin:item.isChainCoin,
					underlyingDecimals:item.underlyingDecimals,
					supplyApy: supplyApy,
					borrowApy: borrowApy,
					liquidity: liquidity,
					totalBorrows: totalBorrows,
					totalSupply: totalSupply,
					assetUsage: assetUsage
					})
			})
		}
    
  } catch (e) {
    console.error(e)
  }
}
</script>
