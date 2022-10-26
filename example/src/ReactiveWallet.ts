// Import the wallet connector
import { ArweaveWebWallet } from 'arweave-wallet-connector'
import { reactive } from 'vue'



export const wallet = new ArweaveWebWallet({ name: 'Connector Example', logo: `${location.href}placeholder.svg` }, {
	state: reactive({ url: import.meta.env.DEV ? 'http://localhost:8080' : 'arweave.app' })
})



// @ts-ignore
window.wallet = wallet