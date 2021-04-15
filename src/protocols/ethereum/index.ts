// Ethereum Spike
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers'


const CONFIG = {
	network: 'homestead',
	apiKey: process.env.ETHERSCAN_API_KEY
}

const provider = new ethers.providers.FallbackProvider([
	new ethers.providers.EtherscanProvider(
		CONFIG.network,
		CONFIG.apiKey
	),
])

async function balance(): Promise<string> {
	try {
		const balanceEns:string = ethers.utils.formatEther(
			await provider.getBalance('vitalik.eth')
		)
		const balanceAddress:string = ethers.utils.formatUnits(
			await provider.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'),
			'ether'
		)
		return balanceEns
	} catch (err) {
		console.error('Error:', err)
		return 'Unknown'
	}    

};

export const ethereum = {
	balance
}