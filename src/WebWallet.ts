import type Transaction from 'arweave/web/lib/transaction'

export class WebWallet {
	private _url: URL
	private _window: Window | null = null
	private _address: string | null = null
	private _promiseController: {
		resolve: (value?: string) => void,
		reject: (reason?: Error) => void
	}[] = []

	constructor(url: string) {
		this._url = new URL(url.includes('://') ? url : 'https://' + url)
		this._url.hash = new URLSearchParams({ origin: window.location.origin }).toString()
	}

	get address() { return this._address }
	get connected() { return !!this._address }

	async connect() {
		this._window = window.open(this._url.toString(), '_blank', 'location,resizable,scrollbars,width=360,height=600')

	}

	async disconnect() { }

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) { }

	async sign() { }

	async decrypt() { }

	async sendRequest(method: string, params: { param: string, value: any }) { }
}
