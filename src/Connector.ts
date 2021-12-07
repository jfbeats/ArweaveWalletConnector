import { is } from 'typescript-is'

import Emitter from './Emitter'
import Bridge, { Emitting as InternalBridgeMap } from './Bridge'
import { AppInfo, ProtocolInfo } from './types/exports'

type BridgeMap = Flatten<UnionToIntersection<InternalBridgeMap['builtin']>>

type Emitting = BridgeMap & {
	connect: string
	disconnect: undefined
	change: string | undefined
}

export default class Connector<EmittingMap extends Record<string, unknown>> extends Emitter<Flatten<EmittingMap & Emitting>> {
	private static _bridges: { [url: string]: { bridge: Bridge, sessions: number[] } } = {}
	private _protocolInfo?: ProtocolInfo
	private _appInfo?: AppInfo
	private _bridge?: Bridge
	private _session = 0
	private _address?: string
	private _listener
	private _emitterPassthrough

	constructor(protocolInfo?: ProtocolInfo, appInfo?: AppInfo, connectToUrl?: string | URL) {
		super()
		this._protocolInfo = protocolInfo
		this._appInfo = appInfo
		this._listener = (message: InternalBridgeMap['message']) => {
			const { method, params, session } = message
			if (session != null && this._session != session) { return }
			if (!session && this._session) { return }
			if (method === 'connect') {
				if (!is<string>(params)) { return }
				if (this._address === params) { return }
				this._address = params
				this.emit('connect', params)
				this.emit('change', params)
			}
			if (method === 'disconnect') { this.handleDisconnect() }
		}
		this._emitterPassthrough = <T extends keyof BridgeMap>(param: InternalBridgeMap['builtin']) => {
			const event = Object.entries(param)[0] as [T, BridgeMap[T]]
			this.emit(event[0], event[1])
		}
		if (connectToUrl) { this.setUrl(connectToUrl) }
	}

	setUrl(connectToUrl: string | URL) {
		this.disconnect()
		const url = typeof connectToUrl === 'string' ? connectToUrl : connectToUrl.origin
		if (!Connector._bridges[url]) {
			this._bridge = new Bridge(connectToUrl, this._appInfo)
			Connector._bridges[url] = { bridge: this._bridge, sessions: [] }
		} else {
			this._bridge = Connector._bridges[url].bridge
			const sessions = Connector._bridges[url].sessions
			for (let i = 0; i <= sessions.length; i++) { if (sessions.indexOf(i) < 0) { this._session = i; break } }
		}
		Connector._bridges[url].sessions.push(this._session)
		this._bridge.on('message', this._listener)
		this._bridge.on('builtin', this._emitterPassthrough)
	}

	get address() { return this._address }
	get connected() { return !!this._address }
	get url() { return this._bridge?.url }
	get keepPopup() { return this._bridge?.keepPopup || false }
	set keepPopup(keep: boolean) { this._bridge && (this._bridge.keepPopup = keep) }

	async connect(options?: object): Promise<string> {
		if (!this._bridge) { throw 'URL missing' }
		const promise = new Promise<string>(resolve => this.once('connect', resolve))
			.finally(() => this._bridge?.completeRequest())
		this._bridge.deliverMessage({ method: 'connect', params: options })
		return promise
	}

	async disconnect(options?: object) {
		if (!this._bridge) { return }
		try { await this.postMessage('disconnect', options) } 
		catch (e) { console.warn('disconnect request failed') }
		this.handleDisconnect()
	}

	private handleDisconnect() {
		this._address = undefined
		this.emit('disconnect', undefined)
		this.emit('change', undefined)
		if (!this._bridge) { return }
		this._bridge.off('message', this._listener)
		this._bridge.off('builtin', this._emitterPassthrough)
		const url = this._bridge.url
		Connector._bridges[url].sessions = Connector._bridges[url].sessions?.filter(x => x != this._session)
		this._bridge = undefined
		setTimeout(() => {
			if (Connector._bridges[url].sessions.length) { return }
			Connector._bridges[url].bridge.disconnect()
			delete Connector._bridges[url]
		}, 100)
	}

	postMessage(method: string, params?: any) {
		if (!this._bridge) { throw 'URL missing' }
		return this._bridge.postMessage({ method, params, ...this._protocolInfo, session: this._session })
	}
}