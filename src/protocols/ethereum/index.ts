// import 'react-native-get-random-values'
import '@ethersproject/shims';
import { ethers } from 'ethers';
import type { BigNumber, Wallet } from 'ethers';

import { env } from 'environments/.env';

/**
 * TODO
 * - Change network (from mainnet to testnets)
 * - Connect to custom/local EVM blockchain (e.g. dev.local, Polygon, Lukso, etc)
 */

const provider = new ethers.providers.FallbackProvider([
	new ethers.providers.EtherscanProvider(
		`${env.ETHERSCAN_NETWORK}`,
		`${env.ETHERSCAN_API_KEY}`,
	),
]);

export class Ethereum {
	walletPrivateKey: string;
	walletJSON: string;
	walletPassword: string;
	walletAddress: string;

	constructor(
		walletPrivateKey = '',
		walletJSON = '',
		walletPassword = '',
		walletAddress = '',
	) {
		this.walletPrivateKey = walletPrivateKey;
		this.walletJSON = walletJSON;
		this.walletPassword = walletPassword;
		this.walletAddress = walletAddress;
	}

	// TODO - Check is valid URI (including IDN)
	public isAddressENS() {
		const { walletAddress } = this;
		return !ethers.utils.isAddress(walletAddress) &&
			/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
				walletAddress,
			)
			? true
			: false;
	}

	public isAddressHex() {
		const { walletAddress } = this;
		if (ethers.utils.isAddress(walletAddress)) {
			return true;
		}
	}

	public async getEnsFromAddress(): Promise<string> {
		const { walletAddress } = this;
		if (!ethers.utils.isAddress(walletAddress)) {
			return 'Not a valid address';
		}
		return await provider
			.lookupAddress(walletAddress)
			.then((result) => {
				const address =
					result === null
						? `${walletAddress.substr(0, 6)}...${walletAddress.slice(-4)}`
						: result;
				return address;
			})
			.catch((err) => `Error: Address doesn't exist. ${err}`);
	}

	public async getAddressFromEns(): Promise<string> {
		const { walletAddress } = this;
		return provider
			.resolveName(walletAddress)
			.then((result) => result)
			.catch((err) => `Error: ${err}`);
	}

	/**
	 * TODO
	 * - Show small amounts
	 * - e.g. 0.000026031493175265 as 0.00002
	 * - Currently showing 0.0
	 */
	public async getBalance(): Promise<string> {
		const { walletAddress } = this;
		return await provider
			.getBalance(walletAddress)
			.then((result) => {
				const balanceRemainder: BigNumber = result.mod(1e14);
				const balanceFormatted = ethers.utils.formatEther(
					result.sub(balanceRemainder),
				);
				return balanceFormatted;
			})
			.catch((err) => {
				console.error('Error:', err);
				return 'Unknown';
			});
	}

	public async walletFromMnemonic(): Promise<object> {
		const { walletPrivateKey } = this;
		const privateKey = walletPrivateKey;
		const walletWithProvider = new ethers.Wallet(privateKey, provider);
		return walletWithProvider;
	}

	/**
	 * Warning: this uses crypto and takes around 10 seconds
	 * ! Crypto in main thread
	 * ! Use Ethers in RN with native crypto?
	 */
	public async walletFromEncryptedJSON(): Promise<void> {
		const { walletJSON, walletPassword } = this;
		const json: string = `${JSON.stringify(walletJSON)}`;
		const password: string = `${walletPassword}`;
		ethers.Wallet.fromEncryptedJson(json, password)
			.then((wallet: Wallet) => {
				return wallet;
			})
			.catch((err) => {
				console.log('Address Failed', err);
				return 'Wallet decryption failed';
			});
	}
}
