// Import the wallet connector
import { ArweaveWebWallet } from 'arweave-wallet-connector'
import { reactive } from 'vue'

// Reactive data about the connection
export const walletData = reactive({
	url: import.meta.env.DEV ? "http://localhost:8080" : 'arweave.app',
	address: undefined as undefined | string,
	keepPopup: false,
	error: '',
})

// Initialize the wallet providing the current app info
export const wallet = new ArweaveWebWallet({ name: 'Connector Example', logo: `${location.href}placeholder.svg` })
wallet.on('connect', (address) => {
	walletData.address = address
	walletData.url = wallet.url as string
})
wallet.on('disconnect', () => walletData.address = undefined)
wallet.on('keepPopup', (keep) => walletData.keepPopup = keep)
