import { PromiseController } from '../utils/PromiseController.js'
import { generateUrl } from '../utils/Utils.js'
import type { Connection, PostMessageOptions, ProtocolInfo, AppInfo } from '../types.js'

import WebSocket, { WebSocketServer } from 'ws'
import open from 'open'

type ChannelController = {
	promise?: Promise<unknown>,
	resolve?: (value?: unknown) => void,
	reject?: (value?: unknown) => void,
}

export default class WebSocketsConnection implements Connection {
	private _url: URL
	private _serverPort: number
	private _wss?: WebSocketServer
	private _channelController: ChannelController = {}
	private _promiseController = new PromiseController()
	
	constructor(connectToUrl: string | URL, appInfo?: AppInfo, serverPort?: number) {
		this._serverPort = serverPort || 1985
		this._url = generateUrl(connectToUrl)
		const urlInfo = {
			origin: 'ws://localhost:' + this._serverPort,
			session: Math.random().toString().slice(2)
		} as any
		if (appInfo?.name) { urlInfo.name = appInfo.name }
		if (appInfo?.logo) { urlInfo.logo = appInfo.logo }
		this._url.hash = new URLSearchParams(urlInfo).toString()
	}
	
	async connect(): Promise<string | undefined> {
		if (this._wss) { return }
		
		let addressResolve: (val: string) => void
		const addressPromise = new Promise<string>(resolve => addressResolve = resolve)
		
		const promise = new Promise((resolve, reject) => this._channelController = { resolve, reject })
		this._channelController.promise = promise
		
		this._wss = new WebSocketServer({ port: this._serverPort })
		this._wss.on('connection', ws => {
			ws.on('message', data => {
				const message = JSON.parse(data.toString())
				if (typeof data !== 'object') { return }
				if (this._promiseController.processResponse(message)) { return }
				const { method, params, id, result, error, session } = message as { [key: string]: unknown }
				if (typeof method !== 'string') { return }
				if (method !== 'connect' || typeof params !== 'string') { return }
				this._channelController?.resolve?.()
				addressResolve(params)
			})
		})
		
		open(this._url.toString())
		return addressPromise
	}
	
	disconnect() {
		this._channelController?.reject?.()
		this._wss?.close()
		this._wss = undefined
	}
	
	async postMessage(method: string, params?: any[], options?: PostMessageOptions & ProtocolInfo) {
		if (!this._wss) { throw 'no connection' }
		const message = { method, params, protocol: options?.protocol, version: options?.version, jsonrpc: '2.0' }
		const promise = this._promiseController.newMessagePromise(message, options)
		this.deliverMessage(message, options)
		return promise
	}
	
	private deliverMessage (message: any, options?: PostMessageOptions) {
		this._channelController.promise = this._channelController?.promise
		?.then(() => this._wss?.clients.forEach(ws => ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify(message))))
		.catch(() => { return })
	}
}
