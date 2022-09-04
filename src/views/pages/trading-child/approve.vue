<template>
  <div class="approvePage" @click="closeFunc">
		<div class="approveBody"  @click.stop="">
			<div class="content">
				<el-row>
          <el-col :span="24">
							<div class="contentCoin">{{tokenName}}</div>
          </el-col>
        </el-row>
				<el-row>
          <el-col :span="24">
							<div class="contentTitle">储蓄存款</div>
          </el-col>
        </el-row>
				<el-row><el-col :span="24"><div></div></el-col></el-row>
				<el-row>
					<el-col :span="2"></el-col>
          <el-col :span="20">
							<div class="contentText">所有ERC20代币需要一次性批准才能进行存款和还款</div>
          </el-col>
					<el-col :span="2"></el-col>
        </el-row>

				<el-row><el-col :span="24"><div></div></el-col></el-row>
				<el-row><el-col :span="24"><div></div></el-col></el-row>

					<el-row>
          <el-col :span="12">
						<el-button type="success" round size="large" @click="closeFunc">取消</el-button>
          </el-col>
					<el-col :span="12">
						<el-button type="success" round size="large" @click="approveButton()">授权</el-button>
          </el-col>
        </el-row>
			</div>
			<div>
			</div>
		</div>
  </div>
</template>
<script>

import { setApprove,approveMaxAmount } from '@/web3/erc20_api'
// import { utils } from "ethers";

export default {
  name: 'approve',
  props: [ 
    'closeFunc',
    'tokenAddress',
    'tokenName',
    'tokenDecimals',
    'contractAddress',
    ],


  data () {
    return {
    }
  },
  methods: {
    async approveButton () {
      // let maxAmount = utils.parseUnits(String(approveMaxAmount), this.tokenDecimals)
      const res = await setApprove(this.tokenAddress, this.contractAddress, this.$store.state.userAddress, approveMaxAmount)
      
      console.log(res)
      // if (res.status) {
      //   const key = this.token0.address + "-" + this.$store.state.userAddress
      //   this.isApprove[key] = true
      //   this.checkSwapParams()
      // }
    }
  },
  async mounted () {

  }
}
</script>

<style  scoped>
.approvePage {
  background: rgba(0, 0, 0, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
}
.approveBody {
  min-height: 270px;
  max-height: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 20px;
  border: none;
  padding: 0;
  background: #ffffff;
}
.content{
	padding-top: 30px;
}
.contentCoin{
	font-size: 12px;
  font-family: days one,sans-serif,tahoma,arial,hiragino sans gb,\5b8b\4f53;
  line-height: 1;
}
.contentTitle{
	font-size: 20px;
	text-align: center;
	font-family: days one,sans-serif,tahoma,arial,hiragino sans gb,\5b8b\4f53;
	line-height: 1.1;
}
.contentText{
	font-family: rubik,sans-serif,tahoma,arial,hiragino sans gb,\5b8b\4f53;
	letter-spacing: 0;
	font-size: 14px;
	line-height: 1.5;
}
::v-deep .el-row {
  margin-bottom: 10px;
}
</style>