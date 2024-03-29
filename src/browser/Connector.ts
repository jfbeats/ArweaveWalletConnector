import Bridge from './Bridge.js'
import Emitter from '../utils/Emitter.js'
import { generateUrl } from '../utils/Utils.js'
import { load, unload } from '../utils/Inject.js'
import { windowMissing } from '../utils/Errors.js'
import type { Emitting as InternalBridgeMap } from './Bridge.js'
import type { Connection, AppInfo, PostMessageOptions, Flatten, UnionToIntersection, ProtocolInfo } from '../types.js'
import { is } from 'typia'



type BridgeMap = Flatten<UnionToIntersection<InternalBridgeMap['builtin']>>
export type Emitting = BridgeMap & {
	connect: string
	disconnect: undefined
	change: string | undefined
}



export default class BrowserConnector extends Emitter<Emitting> implements Connection {
	private static _bridges: { [url: string]: { bridge: Bridge, sessions: number[] } } = {}
	private _appInfo?: AppInfo
	private _bridge?: Bridge
	private _url?: URL
	private _session = 0
	private _address?: string
	private _listener = (message: InternalBridgeMap['message']) => {
		const { method, params, session } = message
		if (session != null && this._session != session) { return }
		if (!session && this._session) { return }
		if (method === 'connect') {
			if (!is<string>(params)) { return }
			this.setAddress(params)
		}
		if (method === 'disconnect') { this.disconnectEvent(false) }
	}
	private _emitterPassthrough

	get address() { return this._address }
	private setAddress(value?: string) {
		if (value && value === this.address) { return }
		this._address = value
		value != null ? this.emit('connect', value) : this.emit('disconnect', value)
		this.emit('change', value)
	}
	get connected() { return this._address != null }
	get url() { return this._bridge?.url }
	get showIframe() { return this._bridge?.showIframe || false }
	get usePopup() { return this._bridge?.usePopup || false }
	get requirePopup() { return this._bridge?.requirePopup || false }
	get keepPopup() { return this._bridge?.keepPopup || false }
	set keepPopup(keep: boolean) { this._bridge && (this._bridge.keepPopup = keep) }

	constructor(appInfo?: AppInfo, connectToUrl?: string | URL) {
		super()
		this._appInfo = appInfo

		this._emitterPassthrough = <T extends keyof BridgeMap>(param: InternalBridgeMap['builtin']) => {
			const event = Object.entries(param)[0] as [T, BridgeMap[T]]
			this.emit(event[0], event[1])
		}
		this.on('connect', () => load(this as any))
		this.on('disconnect', () => unload(this as any))
		if (connectToUrl) { this._url = generateUrl(connectToUrl) }
	}

	setUrl(connectToUrl: string | URL, load?: boolean) {
		if (typeof window === 'undefined') { console.error(windowMissing); return }
		const oldBridge = this._bridge
		const url = generateUrl(connectToUrl)
		this._url = url
		if (this._bridge?.url === url.origin) { return }
		this.disconnect()
		if (!BrowserConnector._bridges[url.origin]) {
			this._bridge = new Bridge(url, this._appInfo, load)
			BrowserConnector._bridges[url.origin] = { bridge: this._bridge, sessions: [] }
		} else {
			this._bridge = BrowserConnector._bridges[url.origin].bridge
			const sessions = BrowserConnector._bridges[url.origin].sessions
			for (let i = 0; i <= sessions.length; i++) { if (sessions.indexOf(i) < 0) { this._session = i; break } }
		}
		BrowserConnector._bridges[url.origin].sessions.push(this._session)
		this._bridge.on('message', this._listener)
		this._bridge.on('builtin', this._emitterPassthrough)
		if (this._bridge.showIframe !== oldBridge?.showIframe) { this.emit('showIframe', this._bridge.showIframe) }
		if (this._bridge.usePopup !== oldBridge?.usePopup) { this.emit('usePopup', this._bridge.usePopup) }
		if (this._bridge.requirePopup !== oldBridge?.requirePopup) { this.emit('requirePopup', this._bridge.requirePopup) }
		if (this._bridge.keepPopup !== oldBridge?.keepPopup) { this.emit('keepPopup', this._bridge.keepPopup) }
	}

	async connect(options?: object): Promise<string> {
		if (!this._url) { throw 'Connect failed: URL missing' }
		if (!this._bridge) { this.setUrl(this._url) }
		const promise = new Promise<string>((resolve, reject) => {
			this.once('change', address => address ? resolve(address) : reject())
		}).finally(() => this._bridge?.completeRequest())
		this._bridge!.deliverMessage({ method: 'connect', params: options })
		return promise
	}

	async disconnect(options?: object) { return this.disconnectEvent(true, options) }

	private async disconnectEvent(fromMethod: boolean, options?: object) {
		if (!this._bridge) { return }
		const oldBridge = this._bridge
		const session = this._session
		const url = oldBridge.url
		this.setAddress(undefined)
		this._bridge = undefined
		this._session = 0
		if (fromMethod) {
			try { await oldBridge.postMessage({ method: 'disconnect', params: [options], session }, { timeout: 5000 }) }
			catch (e) { console.warn('disconnect request failed') }
		}
		oldBridge.off('message', this._listener)
		oldBridge.off('builtin', this._emitterPassthrough)
		BrowserConnector._bridges[url].sessions = BrowserConnector._bridges[url].sessions.filter(x => x != session)
		setTimeout(() => {
			if (BrowserConnector._bridges[url].sessions.length) { return }
			BrowserConnector._bridges[url].bridge.destructor()
			delete BrowserConnector._bridges[url]
		}, 100)
	}

	postMessage(method: string, params?: any[], options?: PostMessageOptions & ProtocolInfo) {
		return new Promise((resolve, reject) => {
			if (!this._url) { throw 'Post message failed: URL missing' }
			if (!this._bridge) { throw 'Post message failed: URL not loaded, call setUrl or connect first' }
			this.once('disconnect', reject)
			this._bridge.postMessage({ method, params, session: this._session, protocol: options?.protocol, version: options?.version }, options).then(resolve).catch(reject)
		})
	}
}