import type Transaction from 'arweave/web/lib/transaction'
import Emitter from './Emitter'

export class WebWallet extends Emitter {
	private _url: URL
	private _iframe: HTMLIFrameElement | null | undefined
	private _popup: Window | null | undefined
	private _usePopup: Boolean = true
	private _keepPopup: Boolean = false
	private _address: string | null | undefined
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



	private listener = (e: MessageEvent) => {
		const { method, params } = e.data
		if (
			e.source !== this._popup && e.source !== this._iframe?.contentWindow
			|| e.origin !== this._url.origin
			|| typeof method !== 'string'
		) { return }
		console.info('WalletConnector:', e)
		if (method === 'connect') {
			const address = params
			if (typeof address !== 'string' || this._address === address) { return }
			this._address = address
			this.emit('connect', this._address)
		}
		if (method === 'disconnect') { this.disconnect() }
		if (method === 'usePopup') {
			const use = params
			if (typeof use !== 'boolean') { return }
			this._usePopup = use
		}
		if (method === 'keepPopup') {
			const keep = params
			if (typeof keep !== 'boolean') { return }
			this._keepPopup = keep
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
		this.openPopup()
		return new Promise(resolve => this.once('connect', resolve))
	}

	async disconnect() {
		if (this._iframe) {
			this._iframe.src = 'about:blank'
			this._iframe.remove()
			this._iframe = null
		}
		this.closePopup(true)
		window.removeEventListener('message', this.listener)
		this._listening = false
		this._address = null
		this.emit('disconnect')
	}

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) {
		const res = await this.broadcastMessage({
			method: 'signTransaction',
			params: JSON.stringify(tx)
		})
	}

	async sign() { }

	async decrypt() { }

	keepPopup(keep: Boolean) {
		this._keepPopup = keep
		if (keep) { this.openPopup() }
	}

	async broadcastMessage(message: object) {
		const id = this._promiseController.length
		const promise = new Promise((resolve, reject) => this._promiseController.push({ resolve, reject }))
		const post = { ...message, jsonrpc: '2.0', id }
		this.postMessage(this._iframe?.contentWindow, post)
		this.openPopup(post)
		await promise
		await new Promise(resolve => setTimeout(resolve, 400))
		if (this._promiseController.length === id + 1) { this.closePopup() }
		return promise
	}

	private async openPopup(post?: object) {
		if (!this._popup && this._usePopup) {
			this._popup = window.open(this._url.toString(), '_blank', 'location,resizable,scrollbars,width=360,height=600')
		}
		if (post) { this.postMessage(this._popup, post) }
	}

	private closePopup(force?: Boolean) {
		if (!this._popup || this._keepPopup) { return }
		this._popup.location.href = 'about:blank'
		this._popup.close()
	}

	async postMessage(window: Window | null | undefined, post: Object) {
		if (!window) { return }
		// await ready
		window.postMessage(post, this._url.origin)
	}
}
