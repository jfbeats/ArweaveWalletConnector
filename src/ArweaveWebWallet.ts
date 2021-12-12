// import Arweave from 'arweave'
import type TransactionInterface from 'arweave/web/lib/transaction'
import type { ApiConfig } from 'arweave/web/lib/api'
import { is } from 'typescript-is'

import Connector from './Connector'

export interface ArweaveAPI {
	getPublicKey(): Promise<string>
	getArweaveConfig(): Promise<Omit<ApiConfig, 'logger'> & { logger: undefined }>
	signTransaction(tx: TransactionInterface, options?: object): Promise<TransactionInterface>
	sign(message: string, options?: object): Promise<string>
	decrypt(message: string, options?: object): Promise<string>
}
type Emitting = {}
interface ProviderOverrides {
	signTransaction(tx: TransactionInterface, options?: object): { id: string, owner?: string, tags?: { name: string, value: string }[], signature: string, fee?: string }
}
export interface ArweaveProviderAPI extends ProviderOverrides, Omit<ArweaveAPI, keyof ProviderOverrides> {}



export class ArweaveWebWallet extends Connector<Emitting> implements ArweaveAPI {
	constructor(appInfo?: { name?: string, logo?: string }, url?: string,) {
		super({ protocol: 'arweave', version: '1.0.0' }, { ...appInfo }, url)
	}

	async getPublicKey() {
		const res = await this.postMessage('getPublicKey')
		if (!is<Awaited<ReturnType<ArweaveProviderAPI['getPublicKey']>>>(res)) { throw 'TypeError' }
		return res
	}

	async getArweaveConfig() {
		const res = await this.postMessage('getArweaveConfig')
		type ReceivedApiConfig = Omit<ApiConfig, 'logger'> & { logger: any }
		if (!is<Awaited<ReturnType<ArweaveProviderAPI['getArweaveConfig']>>>(res)) { throw 'TypeError' }
		delete res.logger
		return res
	}

	async signTransaction(tx: TransactionInterface, options?: object) {
		// check if tx is Transaction or object
		const { data, chunks, ...txHeader } = tx // todo transfer data separately?
		const res = await this.postMessage('signTransaction', { tx: txHeader, options })
		if (!is<Awaited<ReturnType<ArweaveProviderAPI['signTransaction']>>>(res)) { throw 'TypeError' }
		tx.setSignature({ id: res.id, owner: res.owner || tx.owner, signature: res.signature }) // todo res.tags
		if (res.fee) { tx.fee = res.fee }
		return tx
	}

	// async getUploader(tx: Transaction | SerializedUploader | string, data?: Uint8Array | ArrayBuffer): Promise<TransactionUploader> {
	// 	// getUploader be a wallet method instead
	// 	const api = await this.getArweaveConfig(tx) // ask the wallet for the endpoint to upload to
	// 	const arweave = Arweave.init(api) // init arweave instance to that endpoint
	// 	return arweave.transactions.getUploader(tx, data) // generate an uploader for the transaction and endpoint
	// }

	async sign(message: string, options?: object) {
		const res = await this.postMessage('sign', { message, options })
		if (!is<Awaited<ReturnType<ArweaveProviderAPI['sign']>>>(res)) { throw 'TypeError' }
		return res
	}

	async decrypt(message: string, options?: object) {
		const res = await this.postMessage('decrypt', { message, options })
		if (!is<Awaited<ReturnType<ArweaveProviderAPI['decrypt']>>>(res)) { throw 'TypeError' }
		return res
	}
}
