// Contract address on the official website

export const POLYGON_USDT= {
	"address":"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
	"decimals":6,
}

export const QUICKSWAP_ROUTER="0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff";
export const COMPTROLLER_ADDRESS="0xfBE0f3A3d1405257Bd69691406Eafa73f5095723";

export const LENDING_CONTRACT=[
	{
		cTokenAddress: "0x7280faec8c4a6abbb3414e31015ac108113363a4",
		underlyingAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
		name: "USDT",
		isChainCoin: false,
		cTokenDecimals: 18,
		underlyingDecimals: 6,
		logo:"https://pancakeswap.finance/images/tokens/0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f.png",
	},

	{
		cTokenAddress: "0x154250560242c4f2947cf2ea6c8e92e0ce714d4e",
		underlyingAddress: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
		name: "Matic",
		isChainCoin: true,
		cTokenDecimals: 18,
		underlyingDecimals: 18,
		logo:"https://pancakeswap.finance/images/tokens/0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f.png",
	},
	{
		cTokenAddress: "0x35121329dcb7e884b5c8ac3095f833bc99e66874",
		underlyingAddress: "0x831753dd7087cac61ab5644b308642cc1c33dc13",
		name: "Quick",
		isChainCoin: false,
		cTokenDecimals: 18,
		underlyingDecimals: 18,
		logo:"https://pancakeswap.finance/images/tokens/0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f.png",
	},


]