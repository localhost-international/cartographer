import type { BigNumber } from 'ethers'
import type { Dispatch } from 'redux'

export const ETH_WALLET_ADDRESS = 'ethereum/wallet-address'
export const ETH_WALLET_HEX = 'ethereum/wallet-hex'
export const ETH_WALLET_ENS = 'ethereum/wallet-ens'
export const ETH_WALLET_BALANCE = 'ethereum/wallet-balance'

type EthereumState = {
  ethWalletAddress: BigNumber | string | null
  ethWalletHex: string | null
  ethWalletEns: string | null
  ethWalletBalance: string
}

const initialState: EthereumState = {
  ethWalletAddress: null,
  ethWalletHex: null,
  ethWalletEns: null,
  ethWalletBalance: '...'
}

type EthereumWalletAddress = {
	type: typeof ETH_WALLET_ADDRESS
	ethWalletAddress: BigNumber | string | null
}
type EthereumWalletHex = {
	type: typeof ETH_WALLET_HEX
	ethWalletHex: string | null
}
type EthereumWalletENS = {
	type: typeof ETH_WALLET_ENS
	ethWalletEns: string | null
}
type EthereumWalletBalance = {
	type: typeof ETH_WALLET_BALANCE
	ethWalletBalance: string
}

type EthereumActionTypes = 
	EthereumWalletAddress | 
	EthereumWalletHex | 
	EthereumWalletENS | 
	EthereumWalletBalance

export default (
	state: EthereumState = initialState, 
	action: EthereumActionTypes
) => {
  switch (action.type) {
    case ETH_WALLET_ADDRESS: {
      return {
        ...state,
        ethWalletAddress: action.ethWalletAddress
      }
    }
    case ETH_WALLET_HEX: {
      return {
        ...state,
        ethWalletHex: action.ethWalletHex
      }
    }
    case ETH_WALLET_ENS: {
      return {
        ...state,
        ethWalletEns: action.ethWalletEns
      }
    }
    case ETH_WALLET_BALANCE: {
      return {
        ...state,
        ethWalletBalance: action.ethWalletBalance
      }
    }
    default: {
      return { ...state }
    }
  }
}

export const ethWalletAddresss = (address: string) => (dispatch: Dispatch) => {
  console.log('ethWalletAddresss dispatch', address)
  dispatch({ type: ETH_WALLET_BALANCE, ethWalletAddresss: address })
}

export const ethWalletHex = (address: string) => (dispatch: Dispatch) => {
  console.log('ethWalletHex dispatch', address)
  dispatch({ type: ETH_WALLET_HEX, ethWalletHex: address })
}
export const ethWalletEns = (address: string) => (dispatch: Dispatch) => {
  console.log('ethWalletEns dispatch', address)
  dispatch({ type: ETH_WALLET_ENS, ethWalletEns: address })
}

export const ethWalletBalance = (balance: string) => (dispatch: Dispatch) => {
  console.log('ethWalletBalance dispatch', balance)
  dispatch({ type: ETH_WALLET_BALANCE, ethWalletBalance: balance })
}
