import type Transaction from 'arweave/web/lib/transaction'
import Emitter from './Emitter'

type ChannelController = {
	window?: Window | null,
	promise?: Promise<unknown>,
	resolve?: (value?: unknown) => void,
	reject?: (value?: unknown) => void,
}



export class WebWallet extends Emitter {
	private _url: URL
	private _iframeEl?: HTMLIFrameElement | null
	private _iframe: ChannelController = {}
	private _popup: ChannelController = {}
	private _usePopup: Boolean = true
	private _keepPopup: Boolean = false
	private _address?: string
	private _listening: Boolean = false
	private _promiseController: {
		resolve: (value?: string) => void,
		reject: (reason?: Error) => void
	}[] = []

	constructor(url: string, appInfo: { name: string, logo: string }) {
		super()
		this._url = new URL(url.includes('://') ? url : 'https://' + url)
		this._url.hash = new URLSearchParams({ origin: window.location.origin, ...appInfo, session: Math.random().toString().slice(2) }).toString()
		this.openIframe()
	}

	get address() { return this._address }
	get connected() { return !!this._address }
	get keepPopup() { return this._keepPopup }
	set keepPopup(keep: Boolean) {
		this._keepPopup = keep
		if (keep) { this.openPopup() }
		else { this.closePopup() }
	}

	private listener = (e: MessageEvent) => {
		const { method, params, id, result, error } = e.data
		if (e.source !== this._popup.window && e.source !== this._iframe?.window || e.origin !== this._url.origin) { return }
		console.info(`WalletConnector:${e.source === this._popup.window ? 'popup' : 'iframe'}`, e.data)
		if (typeof id === 'number') {
			if (!this._promiseController[id]) { throw 'received result to nonexistent request' }
			if (error) { this._promiseController[id].reject(error) }
			if (result) { this._promiseController[id].resolve(result) }
			return
		}
		if (typeof method !== 'string') { return }

		if (method === 'ready') {
			if (e.source === this._popup.window) { this._popup.resolve?.() }
			if (e.source === this._iframe.window) { this._iframe.resolve?.() }
			return
		}
		if (method === 'connect') {
			if (typeof params !== 'string' || this._address === params) { return }
			this._address = params
		}
		if (method === 'disconnect') {
			if (params) { return }
			this.disconnect()
		}
		if (method === 'usePopup') {
			if (typeof params !== 'boolean') { return }
			this._usePopup = params
		}
		if (method === 'keepPopup') {
			if (typeof params !== 'boolean') { return }
			this._keepPopup = params
			if (!params) { this.closePopup() }
		}
		this.emit(method, params)
	}

	async connect(address?: string): Promise<string> {
		if (!this._listening) { window.addEventListener('message', this.listener) }
		this._listening = true
		this.openIframe()
		this.postMessage({ connect: address })
		return new Promise<string>(resolve => this.once('connect', resolve)).finally(() => this.closePopup())
	}

	disconnect() {
		this.closeIframe()
		this.closePopup(true)
		window.removeEventListener('message', this.listener)
		this._listening = false
		this._address = undefined
		this.emit('disconnect', undefined)
	}

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) {
		const res = await this.postMessage({
			method: 'signTransaction',
			params: tx
		})
	}

	async sign() { }

	async decrypt() { }

	postMessage(message: object) {
		const id = this._promiseController.length
		const promise = new Promise((resolve, reject) => this._promiseController.push({ resolve, reject })).finally(() => this.closePopup())
		const fullMessage = { ...message, id }
		this.deliverMessage(this._iframe, fullMessage)
		this.openPopup()
		this.deliverMessage(this._popup, fullMessage)
		return promise
	}

	private async openIframe() {
		if (this._iframeEl) { return }
		this._iframeEl = document.createElement('iframe')
		this._iframeEl.src = this._url.toString()
		this._iframeEl.style.display = 'none'
		const promise = new Promise((resolve, reject) => this._iframe = { resolve, reject })
		this._iframe.promise = promise
		const injectIframe = () => {
			document.body.appendChild(this._iframeEl as Node)
			this._iframe.window = this._iframeEl?.contentWindow
		}
		if (document.readyState === 'complete' || document.readyState === 'interactive') { injectIframe() }
		else { document.addEventListener('DOMContentLoaded', injectIframe) }
		return promise
	}

	private closeIframe() {
		if (!this._iframeEl) { return }
		this._iframeEl.src = 'about:blank'
		this._iframeEl.remove()
		this._iframeEl = undefined
		this._iframe.reject?.()
		this._iframe = {}
	}

	private async openPopup() {
		if (this._popup.window && !this._popup.window.closed || !this._usePopup) { return this._popup.promise }
		window.name = 'parent'
		const popupWindow = window.open(this._url.toString(), '_blank', 'location,resizable,scrollbars,width=360,height=600')
		const promise = new Promise((resolve, reject) => this._popup = { window: popupWindow, resolve, reject })
		this._popup.promise = promise
		return this._popup.promise
	}

	private closePopup(force?: Boolean) {
		if (!this._popup.window || this._popup.window?.closed) { return }
		if (this._keepPopup && !force) { return }
		this._popup.window.location.href = 'about:blank'
		this._popup.window.close()
		this._popup.reject?.()
		this._popup = {}
	}

	private async deliverMessage(channel: ChannelController, fullMessage?: Object) {
		if (!channel.promise) { return }
		if (!fullMessage) { return channel.promise }
		channel.promise = channel.promise.then(() => channel.window?.postMessage(fullMessage, this._url.origin)).catch(() => { return })
		return channel.promise
	}
}
