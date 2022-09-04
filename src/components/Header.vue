<template>
  <div class="header">
    <el-row :gutter="2">
      <el-col :span="4" :offset="12">
        <div>
          <el-dropdown size=large @command="handleWalletConnect" split-button :type="chainId===56 || chainId===128 || 
          chainId==='0x38' || chainId==='0x80'|| 
          chainId===137 || chainId==='0x89' ? 'success':'danger'">
            <span @click="handleWalletConnect">{{connectWallet}}</span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="Connect">Connect</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu>
                <el-dropdown-item command="exit">exit</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </el-col>

      <el-col :span="3">
        <el-button type="success" plain>{{$filters.formatNumber(assets,2)}}
          <span v-if="chainId===56 || chainId==='0x38'">BNB</span>
          <span v-if="chainId===128 || chainId==='0x80'">HT</span>
           <span v-if="chainId===137 || chainId==='0x89'">Matic</span>
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success" round @click="onCopy">
          {{$filters.formatAddress(userAddress)}}

          <el-icon>
            <copy-document />
          </el-icon>
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-icon size=30 @click="props.settingOpenFunc" id="SettingIcon">
          <setting />
        </el-icon>
      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import { defineProps, onMounted, watch, ref } from 'vue'
import useWallet from '../hooks/useWallte'
import useClipboard from 'vue-clipboard3'


const {
  onConnect,
  connected,
  // web3,
  userAddress,
  chainId,
  // networkId,
  resetApp,
  assets,
  getAccountAssets,
} = useWallet();

const props = defineProps({
  settingOpenFunc: Function
});

onMounted(() => {
  getAccountAssets()
});
let connectWallet = ref("Connect Wallet");


watch(chainId, (newValue) => {
  if (newValue != 56  && 
      newValue != 128 &&
      newValue != 137  ) {
    connectWallet.value = "Error Network"
  } else if (newValue == 56 ) {
    connectWallet.value = "BSC"
  } else if (newValue == 128 ) {
    connectWallet.value = "HECO"
  } else if (newValue == 137 ) {
    connectWallet.value = "Polygon"
  }
  console.log("connectWallet:", newValue)
});
const handleWalletConnect = async (command) => {
  if (command != "exit") {
    await onConnect()
    if (connected) {
      // console.log(userAddress)
      // console.log('afterConnectdWallet', connected);
    }
  } else {
    resetApp()
  }

};
const { toClipboard } = useClipboard()
const onCopy = async () => {
  try {
    await toClipboard(userAddress.value)
    console.log('Copied to clipboard')
  } catch (e) {
    console.error(e)
  }
}


</script>




<style scoped>
.header {
  margin-bottom: 10px;
}
/* .el-button--large */
:deep .el-button--large {
  /* width: 300px !important; */
}
.el-button {
  width: 100%;
  height: 40px !important;
}
:deep .el-dropdown {
  display: inline-block;
}
:deep .el-icon {
  margin-left: 10px;
}
</style>
