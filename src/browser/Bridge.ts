import Emitter from '../utils/Emitter.js'
import { PromiseController } from '../utils/PromiseController.js'
import type { AppInfo, PostMessageOptions } from '../types.js'
import { is } from 'typescript-is'

type ChannelController = {
	window?: Window | null,
	promise?: Promise<unknown>,
	resolve?: (value?: unknown) => void,
	reject?: (value?: unknown) => void,
}

export type Emitting = {
	message: {
		method: string
		params: unknown
		session?: number | string | undefined // todo remove
	}
	builtin: { usePopup: boolean }
	| { requirePopup: boolean }
	| { keepPopup: boolean }
	| { showIframe: boolean }
}

const WIDTH = '400'
const HEIGHT = '600'

export default class Bridge extends Emitter<Emitting> {
	private _url: URL
	private _iframeParentNode?: Node
	private _iframeNode?: HTMLElement | null
	private _iframeEl?: HTMLIFrameElement | null
	private _iframe: ChannelController = {}
	private _showIframe = false
	private _popup: ChannelController = {}
	private _usePopup = true
	private _requirePopup = false
	private _keepPopup = false
	private _promiseController = new PromiseController()
	private _pending: number[] = []

	get url() { return this._url?.origin }
	get showIframe() { return this._showIframe }
	set showIframe(value) {
		if (value === this._showIframe) { return }
		this._showIframe = value
		this.deliverMessage({ method: 'showIframe', params: value })
		this.emit('builtin', { showIframe: value })
		if (!this._iframeNode) { return }
		if (!this._iframeParentNode) {
			this._iframeNode.style.opacity = value ? '1' : '0'
			this._iframeNode.style.pointerEvents = value ? '' : 'none'
			this._iframeNode.style.touchAction = value ? '' : 'none'
			this._iframeNode.style.zIndex = value ? '1000000' : '-1000000'
			this._iframeNode.style.transform = value ? '' : 'translate(0, 24px)'
			this._iframeNode.style.transition = value ? 'opacity 0.36s cubic-bezier(0.22, 1, 0.36, 1), transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)' : 'opacity 0.1s ease, transform 0.1s ease, z-index 0s linear 0.1s'
		}
	}
	get usePopup() { return this._usePopup }
	private setUsePopup(value: boolean) {
		if (value === this._usePopup) { return }
		this._usePopup = value
		this.emit('builtin', { usePopup: value })
	}
	get requirePopup() { return this._requirePopup }
	private setRequirePopup(value: boolean) {
		if (value === this._requirePopup) { return }
		this._requirePopup = value
		this.emit('builtin', { requirePopup: value })
	}
	get keepPopup() { return this._keepPopup }
	set keepPopup(value) {
		this._keepPopup = value
		this.emit('builtin', { keepPopup: value })
		if (!value) { this.closePopup() }
		if (value) { this.openPopup(true) }
	}



	constructor(connectToUrl: URL, appInfo?: AppInfo) {
		super()
		this._iframeParentNode = appInfo?.iframeParentNode
		this._url = connectToUrl
		if (typeof window !== 'undefined') {
			const urlInfo = {
				origin: window.location.origin,
				session: Math.random().toString().slice(2)
			} as any
			if (appInfo?.name) { urlInfo.name = appInfo.name }
			if (appInfo?.logo) { urlInfo.logo = appInfo.logo }
			this._url.hash = new URLSearchParams(urlInfo).toString()
			window.addEventListener('message', this.listener)
			this.openIframe()
		}
	}

	destructor(options?: object) {
		this.closeIframe()
		this.closePopup(true)
		window.removeEventListener('message', this.listener)
	}



	private listener = (e: MessageEvent) => {
		if (e.source !== this._popup.window && e.source !== this._iframe?.window) { return }
		if (e.origin !== this._url?.origin) { return }
		if (typeof e.data !== 'object') { return }
		const { method, params, id, result, error, session } = e.data as { [key: string]: unknown }
		console.info(`WalletConnector:${e.source === this._popup.window ? 'popup' : 'iframe'}`, e.data)
		if (id != null) { this._pending = this._pending.filter(x => x != id) }
		if (this._promiseController.processResponse(e.data)) { return }
		if (typeof method !== 'string') { return }

		// reserved methods
		if (method === 'ready') {
			if (e.source === this._popup.window) { this._popup.resolve?.() }
			if (e.source === this._iframe.window) { this._iframe.resolve?.() }
			return
		}
		if (method === 'change') { return }

		// verified methods
		if (method === 'showIframe') {
			if (typeof params !== 'boolean') { return }
			this.showIframe = params
		}
		if (method === 'usePopup') {
			if (typeof params !== 'boolean') { return }
			this.setUsePopup(params)
		}
		if (method === 'keepPopup') {
			if (typeof params !== 'boolean') { return }
			this.setRequirePopup(params)
		}
		const emitting = { method, params, session }
		if (!is<Emitting['message']>(emitting)) { return console.warn('dropped') }
		this.emit('message', emitting)
	}



	postMessage(message: object, options?: PostMessageOptions) {
		const promise = this._promiseController.newMessagePromise(message, options).finally(() => this.completeRequest())
		this.deliverMessage(message)
		return promise
	}

	private openIframe() {
		if (this._iframeEl) { return }
		this._iframeNode = document.createElement('div')
		this._iframeEl = document.createElement('iframe')
		this._iframeEl.src = this._url.toString()
		this._iframeEl.allow = 'usb; hid; bluetooth; serial; camera; payment; web-share'
		this._iframeEl.style.border = 'none'
		if (!this._iframeParentNode) {
			this._iframeEl.width = WIDTH
			this._iframeEl.height = HEIGHT
			this._iframeEl.style.borderRadius = '8px'
			this._iframeEl.style.maxWidth = '100%'
			this._iframeEl.style.maxHeight = '100%'
			this._iframeNode.style.position = 'fixed'
			this._iframeNode.style.inset = '0'
			this._iframeNode.style.display = 'flex'
			this._iframeNode.style.alignItems = 'center'
			this._iframeNode.style.justifyContent = 'center'
			this._iframeNode.style.background = '#00000088'
			this._iframeNode.style.opacity = '0'
			this._iframeNode.style.pointerEvents = 'none'
			this._iframeNode.style.touchAction = 'none'
			this._iframeNode.style.zIndex = '-1000000'
			this._iframeNode.style.transform = 'translate(0, 24px)'
			this._iframeNode.style.transition = 'opacity 0.1s ease, transform 0.1s ease, z-index 0s linear 0.1s'
		}
		this._iframeNode.appendChild(this._iframeEl)
		const promise = new Promise((resolve, reject) => this._iframe = { resolve, reject })
		this._iframe.promise = promise
		const injectIframe = () => {
			if (this._iframeParentNode) { this._iframeParentNode.appendChild(this._iframeNode!) }
			else { document.body.appendChild(this._iframeNode!) }
			this._iframe.window = this._iframeEl?.contentWindow
		}
		if (document.readyState === 'complete' || document.readyState === 'interactive') { injectIframe() }
		else { document.addEventListener('DOMContentLoaded', injectIframe) }
	}

	private closeIframe() {
		this._iframeEl?.setAttribute('src', 'about:blank')
		this._iframeNode?.remove()
		this._iframeNode = undefined
		this._iframeEl = undefined
		this._iframe.reject?.()
		this._iframe = {}
	}

	private openPopup(force?: boolean) {
		if (this._popup.window && !this._popup.window.closed) { this._popup.window.focus(); return }
		if (!this.usePopup && !force) { return }
		window.name = 'parent'
		const popupWindow = window.open(this._url.toString(), '_blank', `location,resizable,scrollbars,width=${WIDTH},height=${HEIGHT}`)
		const promise = new Promise((resolve, reject) => this._popup = { window: popupWindow, resolve, reject })
		this._popup.promise = promise
		const timer = setInterval(() => {
			if (this._popup.window && !this._popup.window.closed) { return }
			if (this.keepPopup) { this.keepPopup = false }
			clearInterval(timer)
		}, 200)
	}

	private closePopup(force?: boolean) {
		if (!this._popup.window || this._popup.window?.closed) { return }
		// todo if keepPopup -> might require a return back to prev page if on mobile
		if ((this.keepPopup || this.requirePopup) && !force) { return }
		const popupWindow = this._popup.window
		popupWindow.close()
		popupWindow.location.href = 'about:blank'
		let i = 0
		const timer = setInterval(() => {
			if (i > 50 || !popupWindow || popupWindow.closed) { clearInterval(timer) } else { i++ }
			popupWindow.close()
		}, 100)
		this._popup.reject?.()
		this._popup = {}
	}

	completeRequest() { setTimeout(() => {
		if (this._pending.length) { return }
		this.closePopup()
		this.showIframe = false
	}, 100)}

	deliverMessage(message: any, options?: PostMessageOptions) {
		if (!this._url) { throw 'Missing URL' }
		console.info(`WalletConnector:post`, message)
		const fullMessage = { ...message, jsonrpc: '2.0' }
		fullMessage.id != null && this._pending.push(fullMessage.id)
		this.openIframe()
		this._iframe.promise = this._iframe.promise
			?.then(() => this._iframe.window?.postMessage(fullMessage, this._url.origin, options?.transfer ? [fullMessage] : undefined))
			.catch(() => { return })
		this.openPopup()
		this._popup.promise = this._popup.promise
			?.then(() => this._popup.window?.postMessage(fullMessage, this._url.origin, options?.transfer ? [fullMessage] : undefined))
			.catch(() => { return })
	}
}
