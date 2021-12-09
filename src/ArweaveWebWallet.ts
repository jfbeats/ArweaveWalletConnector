// import Arweave from 'arweave'
import type Transaction from 'arweave/web/lib/transaction'
import type { ApiConfig } from 'arweave/web/lib/api'
import type { SerializedUploader, TransactionUploader } from 'arweave/web/lib/transaction-uploader'
import { is } from 'typescript-is'

import Connector from './Connector'

type Emitting = {}

export class ArweaveWebWallet extends Connector<Emitting> {
	constructor(appInfo?: { name?: string, logo?: string }, url?: string,) {
		super({ protocol: 'arweave', version: '1.0.0' }, { ...appInfo }, url)
	}

	async getPublicKey(): Promise<string> {
		const res = await this.postMessage('getPublicKey')
		if (!is<string>(res)) { throw 'TypeError' }
		return res
	}

	async getArweaveConfig(tx?: Transaction | SerializedUploader | string): Promise<ApiConfig> {
		const res = await this.postMessage('getArweaveConfig', tx)
		type ReceivedApiConfig = Omit<ApiConfig, 'logger'> & { logger: any }
		if (!is<ReceivedApiConfig>(res)) { throw 'TypeError' }
		delete res.logger
		return res
	}

	async signTransaction(tx: Transaction, options?: object): Promise<Transaction> {
		// check if tx is Transaction or object
		const { data, chunks, ...txHeader } = tx // todo transfer data separately?
		const res = await this.postMessage('signTransaction', { tx: txHeader, options })
		if (!is<{ id: string, owner?: string, tags?: { name: string, value: string }[], signature: string, fee?: string }>(res)) { throw 'TypeError' }
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

	async sign(message: string, options?: object): Promise<string> {
		const res = await this.postMessage('sign', { message, options })
		if (!is<string>(res)) { throw 'TypeError' }
		return res
	}

	async decrypt(message: string, options?: object): Promise<string> {
		const res = await this.postMessage('decrypt', { message, options })
		if (!is<string>(res)) { throw 'TypeError' }
		return res
	}
}
