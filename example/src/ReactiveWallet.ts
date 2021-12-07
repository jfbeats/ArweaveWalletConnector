// Import the wallet connector
import { ArweaveWebWallet } from 'arweave-wallet-connector'
import { reactive } from 'vue'
import { AppInfo } from 'arweave-wallet-connector/src/types/exports'

export class ReactiveWallet extends ArweaveWebWallet {
	state = reactive({
		url: import.meta.env.DEV ? "http://localhost:8080" : 'arweave.app',
		address: undefined as undefined | string,
		keepPopup: false,
		error: '',
	})
	constructor (appInfo?: AppInfo, url?: string) {
		super(appInfo, url)
		this.on('connect', (address) => {
			this.state.address = address
			this.state.url = wallet.url as string
		})
		this.on('disconnect', () => this.state.address = undefined)
		this.on('keepPopup', (keep) => this.state.keepPopup = keep)
	}
	get url () { return this.state.url }
	get address () { return this.state.address }
	get keepPopup () { return this.state.keepPopup }
	set keepPopup (value) { super.keepPopup = value }
	get error () { return this.state.error }
	set error (value) { this.state.error = value }
}

export const wallet = new ReactiveWallet({ name: 'Connector Example', logo: `${location.href}placeholder.svg` })
