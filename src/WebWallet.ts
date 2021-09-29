import type Transaction from 'arweave/web/lib/transaction'
import EventEmitter from 'eventemitter3'

export class WebWallet extends EventEmitter {
	private _url: URL
	private _window: Window | null = null
	private _address: string | null = null
	private _listening: Boolean = false
	private _promiseController: {
		resolve: (value?: string) => void,
		reject: (reason?: Error) => void
	}[] = []

	constructor(url: string) {
		super()
		this._url = new URL(url.includes('://') ? url : 'https://' + url)
		this._url.hash = new URLSearchParams({ origin: window.location.origin }).toString()
	}

	get address() { return this._address }
	get connected() { return !!this._address }

	listener = (e: MessageEvent) => {
		console.info(e)
		if (e.source !== this._window || e.origin !== this._url.origin) { return }
		if (e.data.method === 'connect') {
			this._address = e.data.params.address
			this.emit('connect', this._address)
		}
		if (e.data.method === 'disconnect') {
			this.disconnect()
		}
	}

	async connect(message?: object): Promise<any> {
		if (!this._listening) {
			window.addEventListener('message', this.listener)
			this._listening = true
		}
		if (!this._window) {
			window.name = 'parent';
			const iframe = document.createElement('iframe')
			iframe.src = this._url.toString()
			iframe.style.display = 'none'
			this._window = iframe.contentWindow
			if (document.readyState === 'complete' || document.readyState === 'interactive') {
				document.body.appendChild(iframe)
			} else {
				document.addEventListener('DOMContentLoaded', () => document.body.appendChild(iframe))
			}
		}
		return new Promise((resolve, reject) => this.once('connect', resolve))
	}

	async disconnect() {
		if (this._window) { this._window.close() }
		window.removeEventListener('message', this.listener)
		this._listening = false
		this._address = null
		this.emit('disconnect')
	}

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) { }

	async sign() { }

	async decrypt() { }

	async postMessage(message: object) {
		this._window?.postMessage({ jsonrpc: '2.0', ...message }, this._url.origin)
	}
}
