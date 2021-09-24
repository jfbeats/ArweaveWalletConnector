import type Transaction from 'arweave/web/lib/transaction'

export default class WebWallet {
	private url: URL
	private window: Window | undefined

	constructor(url: string) {
		this.url = new URL(url)
	}

	async getAddress() {

	}

	async getPublicKey() {

	}

	async signTransaction(tx: Transaction) {

	}

	async sign() {

	}

	async decrypt() {

	}

	async requestPermissions() {

	}

	async getPermissions() {

	}

	async getArweaveConfig() {

	}
}
