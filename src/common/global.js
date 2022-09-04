
 const _globalState = {
  currentChainWeb3Client: null,
  currentChainId: null,
  userAddress:null,
};

export function setCurrentChainWeb3Client(web3Client) {
  console.log('global state web3 client', web3Client);
  _globalState.currentChainWeb3Client = web3Client;
}

export function setCurrentChainId(chainId) {
  console.log('global state chain id', chainId);
  _globalState.currentChainId = chainId;

}
export function setUserAddress(userAddress) {
  console.log('global userAddress', userAddress);
  _globalState.userAddress = userAddress;
}


/**
 * 避免外部引用对象时随意修改其值
 */
const _globalStateProxy = new Proxy(_globalState, {
	// function(obj, prop, value) {
  set: function() {
    throw new Error('can not modify global state');
  },
});

export default _globalStateProxy;
