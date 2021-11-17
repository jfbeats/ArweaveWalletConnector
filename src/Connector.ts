import Emitter from './Emitter'
import Bridge from './Bridge'

type Map = {
	connect: string
	disconnect: undefined
	change?: string
	usePopup: boolean
	keepPopup: boolean
}

export default class Connector<ProtocolMap extends Record<string, unknown>> extends Emitter<ProtocolMap | Map> {
	private static _bridges: { [url: string]: { bridge: Bridge, count: number } } = {}
	private _protocolInfo?: { protocol?: string, version?: string }
	private _appInfo?: { name?: string, version?: string }
	private _bridge?: Bridge
	private _session = 0
	private _address?: string

	constructor(protocolInfo?: { protocol?: string, version?: string }, appInfo?: { name?: string, logo?: string }, connectToUrl?: string | URL) {
		super()
		this._protocolInfo = protocolInfo
		this._appInfo = appInfo
		if (connectToUrl) { this.setUrl(connectToUrl) }
	}

	setUrl(connectToUrl: string | URL) {
		this.disconnect()
		this._bridge = new Bridge(connectToUrl, this._appInfo)
		Connector._bridges[this._bridge.url].count++
		// filter by session
		this._bridge.on('message', (message) => {
			const { params, session } = message as any
		})
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
		return this._bridge.connect(options)
	}

	disconnect() {
		if (!this._bridge) { return }
		// post message
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