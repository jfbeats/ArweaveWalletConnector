import Connector from './Connector'
import { is } from 'typescript-is'
import type { FromProvider, AsVerifier, Override, Null, AppInfo } from './types'
import type Transaction from 'arweave/web/lib/transaction'
import type { TransactionInterface } from 'arweave/web/lib/transaction'
import type { ApiConfig } from 'arweave/web/lib/api'



interface SerializedTx extends Override<TransactionInterface, {
	tags: { name: string, value: string }[]
	data: any
}> {}



export interface ArweaveInterface {
	getPublicKey(): Promise<string>
	getArweaveConfig(): Promise<Omit<ApiConfig, 'logger'>>
	signTransaction(tx: Transaction, options?: object | Null): Promise<Transaction>
	sign(message: string, options?: object | Null): Promise<string>
	decrypt(message: string, options?: object | Null): Promise<string>
}
export interface ArweaveProviderInterface extends Override<ArweaveInterface, {
	getArweaveConfig(): Promise<Override<ApiConfig, { logger?: any }>>
	signTransaction(tx: Partial<SerializedTx>, options?: object | Null): Promise<{
		id: string, owner?: string | Null, tags?: SerializedTx['tags'] | Null, signature: string, reward?: string | Null }>
}> {}
interface FromArweaveProvider extends FromProvider<ArweaveProviderInterface> { }



type Emitting = {}



export class ArweaveWebWallet extends Connector<Emitting> implements ArweaveInterface {
	constructor(appInfo?: AppInfo, url?: string) {
		super({ protocol: 'arweave', version: '1.0.0' }, { ...appInfo }, url)
	}

	async getPublicKey() {
		const res = await this.postMessage('getPublicKey')
		if (!is<FromArweaveProvider['getPublicKey']>(res)) { throw 'TypeError' }
		return res
	}

	async getArweaveConfig() {
		const res = await this.postMessage('getArweaveConfig')
		if (!is<FromArweaveProvider['getArweaveConfig']>(res)) { throw 'TypeError' }
		delete res.logger
		return res
	}

	async signTransaction(tx: Transaction, options?: object | Null) {
		const { data, chunks, ...txHeader } = tx // todo transfer data separately?
		const res = await this.postMessage('signTransaction', [txHeader, options])
		if (!is<FromArweaveProvider['signTransaction']>(res)) { throw 'TypeError' }
		tx.setSignature({
			id: res.id,
			owner: res.owner || tx.owner,
			// @ts-ignore todo
			tags: res.tags,
			signature: res.signature,
			reward: res.reward || undefined
		})
		return tx
	}

	// async getUploader(tx: Transaction | SerializedUploader | string, data?: Uint8Array | ArrayBuffer): Promise<TransactionUploader> {
	// 	// getUploader be a wallet method instead
	// 	const api = await this.getArweaveConfig(tx) // ask the wallet for the endpoint to upload to
	// 	const arweave = Arweave.init(api) // init arweave instance to that endpoint
	// 	return arweave.transactions.getUploader(tx, data) // generate an uploader for the transaction and endpoint
	// }

	async sign(message: string, options?: object | Null) {
		const res = await this.postMessage('sign', [message, options])
		if (!is<FromArweaveProvider['sign']>(res)) { throw 'TypeError' }
		return res
	}

	async decrypt(message: string, options?: object | Null) {
		const res = await this.postMessage('decrypt', [message, options])
		if (!is<FromArweaveProvider['decrypt']>(res)) { throw 'TypeError' }
		return res
	}
}



export class ArweaveVerifier implements AsVerifier<ArweaveProviderInterface> {
	getPublicKey() { return true }
	getArweaveConfig() { return true }
	signTransaction(tx: Partial<SerializedTx>, options?: object | Null) { return is<typeof tx>(tx) && is<typeof options>(options) }
	sign(message: string, options?: object | Null) { return is<typeof message>(message) && is<typeof options>(options) }
	decrypt(message: string, options?: object | Null) { return is<typeof message>(message) && is<typeof options>(options) }
}