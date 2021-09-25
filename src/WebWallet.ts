import type Transaction from 'arweave/web/lib/transaction'

export default class WebWallet {
	private _url: URL
	private _window: Window | null = null
	private _address: string | null = null

	constructor(url: string) {
		this._url = new URL(url)
	}

	get address() { return this._address }

	async connect() { }

	async disconnect() { }

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) { }

	async sign() { }

	async decrypt() { }
}
