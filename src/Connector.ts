import { is } from 'typescript-is'

import Emitter from './Emitter'
import Bridge, { EmitterMap as BridgeEmitterMap } from './Bridge'

type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never

type EmitterMap = {
	[key in keyof BridgeEmitterMap['builtin']]: BridgeEmitterMap['builtin'][key]
} & {
	connect: string
	disconnect: undefined
	change: string | undefined
}

export default class Connector<ProtocolMap extends Record<string, unknown>> extends Emitter<Flatten<ProtocolMap & EmitterMap>> {
	private static _bridges: { [url: string]: { bridge: Bridge, count: number } } = {}
	private _protocolInfo?: { protocol?: string, version?: string }
	private _appInfo?: { name?: string, version?: string }
	private _bridge?: Bridge
	private _session = 0
	private _address?: string
	private _listener
	private _emitterPassthrough

	constructor(protocolInfo?: { protocol?: string, version?: string }, appInfo?: { name?: string, logo?: string }, connectToUrl?: string | URL) {
		super()
		this._protocolInfo = protocolInfo
		this._appInfo = appInfo
		this._listener = (message: BridgeEmitterMap['message']) => {
			const { method, params, session } = message
			if (session != null && this._session != session) { return }
			if (method === 'connect') { typeof params === 'string' && this.emit('connect', params) }
			if (method === 'disconnect') { this.disconnect() }
		}
		this._emitterPassthrough = <T extends keyof BridgeEmitterMap['builtin']> (param: BridgeEmitterMap['builtin']) => {
			const event = Object.entries(param)[0] as [T, BridgeEmitterMap['builtin'][T]]
			this.emit(event[0], event[1])
		}
		if (connectToUrl) { this.setUrl(connectToUrl) }
	}

	setUrl(connectToUrl: string | URL) {
		this.disconnect()
		const url = typeof connectToUrl === 'string' ? connectToUrl : connectToUrl.origin
		if (!Connector._bridges[url]) {
			this._bridge = new Bridge(connectToUrl, this._appInfo)
			Connector._bridges[url] = { bridge: this._bridge, count: 0 }
		} else {
			this._bridge = Connector._bridges[url].bridge
		}
		Connector._bridges[url].count++
		this._bridge.on('message', this._listener)
		this._bridge.on('builtin', this._emitterPassthrough)
		// this._bridge.on('disconnect', () => {
		// 	if (this._address === address) { return }
		// 	this._address = address
		// 	this.emit('connect', address)
		// 	this.emit('change', address)
		// 	if (!this._address) { return }
		// 	this._address = undefined
		// 	this.emit('disconnect', undefined)
		// 	this.emit('change', undefined)
		// })
	}

	get address() { return this._address }
	get connected() { return !!this._address }
	get url() { return this._bridge?.url }
	get keepPopup() { return this._bridge?.keepPopup || false }
	set keepPopup(keep: boolean) { this._bridge && (this._bridge.keepPopup = keep) }

	connect(options?: object): Promise<string> {
		if (!this._bridge) { throw 'URL missing' }
		const promise = new Promise<string>(resolve => this.once('connect', resolve))
			.finally(() => this._bridge?.completeRequest())
		this._bridge.deliverMessage({ method: 'connect', params: options })
		return promise
	}

	disconnect(options?: object) {
		if (!this._bridge) { return }
		// post message
		this._bridge.off('message', this._listener)
		this._bridge.off('builtin', this._emitterPassthrough)
		const url = this._bridge.url
		Connector._bridges[url].count--
		this._bridge = undefined
		setTimeout(() => {
			if (Connector._bridges[url].count > 0) { return }
			Connector._bridges[url].bridge.disconnect()
			delete Connector._bridges[url]
		}, 1000)
	}

	postMessage(method: string, params?: any) {
		if (!this._bridge) { throw 'URL missing' }
		return this._bridge.postMessage({ method, params, ...this._protocolInfo, session: this._session })
	}
}