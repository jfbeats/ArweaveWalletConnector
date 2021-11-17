import Arweave from 'arweave'
import type Transaction from 'arweave/node/lib/transaction'
import type { ApiConfig } from 'arweave/node/lib/api'
import type { SerializedUploader, TransactionUploader } from 'arweave/node/lib/transaction-uploader'
import { is } from 'typescript-is'

import Connector from './Connector'

type EmitterMap = {}

export class ArweaveWebWallet extends Connector<EmitterMap> {
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
		const { data, chunks, ...txHeader } = tx // todo transfer data separately?
		const res = await this.postMessage('signTransaction', { tx: txHeader, options })
		if (!is<{ signature: string, fee?: string }>(res)) { throw 'TypeError' }
		tx.signature = res.signature
		if (res.fee) { tx.fee = res.fee } // todo only if not bundle data transaction?
		return tx
	}

	async getUploader(tx: Transaction | SerializedUploader | string, data?: Uint8Array | ArrayBuffer): Promise<TransactionUploader> {
		// getUploader be a wallet method instead
		const api = await this.getArweaveConfig(tx) // ask the wallet for the endpoint to upload to
		const arweave = Arweave.init(api) // init arweave instance to that endpoint
		return arweave.transactions.getUploader(tx, data) // generate an uploader for the transaction and endpoint
	}

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
