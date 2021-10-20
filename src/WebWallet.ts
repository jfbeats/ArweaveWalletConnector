import type Transaction from 'arweave/web/lib/transaction'
import EventEmitter from 'eventemitter3'

export class WebWallet extends EventEmitter {
	private _url: URL
	private _iframe: HTMLIFrameElement | null = null
	private _window: Window | null = null
	private _address: string | null = null
	private _listening: Boolean = false
	private _promiseController: {
		resolve: (value?: string) => void,
		reject: (reason?: Error) => void
	}[] = []

	constructor(url: string, appInfo: { name: string, logo: string }) {
		super()
		this._url = new URL(url.includes('://') ? url : 'https://' + url)
		this._url.hash = new URLSearchParams({ origin: window.location.origin, ...appInfo, session: Math.random().toString().slice(2) }).toString()
	}

	get address() { return this._address }
	get connected() { return !!this._address }

	listener = (e: MessageEvent) => {
		if (e.source !== this._window && e.source !== this._iframe?.contentWindow || e.origin !== this._url.origin) { return }
		console.info('WalletConnector:', e)
		if (e.data.method === 'connect') {
			if (this._address === e.data.params.address) { return }
			this._address = e.data.params.address
			this.emit('connect', this._address)
		}
		if (e.data.method === 'disconnect') {
			this.disconnect()
		}
	}

	async connect(): Promise<any> {
		if (!this._listening) {
			window.addEventListener('message', this.listener)
			this._listening = true
		}
		if (!this._iframe) {
			window.name = 'parent'
			this._iframe = document.createElement('iframe')
			this._iframe.src = this._url.toString()
			this._iframe.style.display = 'none'
			if (document.readyState === 'complete' || document.readyState === 'interactive') {
				document.body.appendChild(this._iframe as Node)
			} else {
				document.addEventListener('DOMContentLoaded', () => document.body.appendChild(this._iframe as Node))
			}
		}
		if (!this._window) {
			this._window = window.open(this._url.toString(), '_blank', 'location,resizable,scrollbars,width=360,height=600')
		}
		return new Promise(resolve => this.once('connect', resolve))
	}

	async disconnect() {
		if (this._iframe) {
			this._iframe.src = 'about:blank'
			this._iframe.remove()
			this._iframe = null
		}
		if (this._window) {
			this._window.location.href = 'about:blank'
			this._window.close()
		}
		window.removeEventListener('message', this.listener)
		this._listening = false
		this._address = null
		this.emit('disconnect')
	}

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) {
		const res = await this.postMessage({
			method: 'signTransaction',
			params: JSON.stringify(tx)
		})
	}

	async sign() { }

	async decrypt() { }

	async postMessage(message: object) {
		const id = this._promiseController.length
		return new Promise((resolve, reject) => {
			this._promiseController.push({ resolve, reject })
			const post = { ...message, jsonrpc: '2.0', id }
			this._iframe?.contentWindow?.postMessage(post, this._url.origin)
			this._window?.postMessage(post, this._url.origin)
		})
	}
}
