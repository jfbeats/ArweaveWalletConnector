import Arweave from 'arweave'
import type Transaction from 'arweave/node/lib/transaction'
import type { ApiConfig } from 'arweave/node/lib/api'
import type { SerializedUploader, TransactionUploader } from 'arweave/node/lib/transaction-uploader'
import { is } from 'typescript-is'

import Bridge from './Bridge'



export class ArweaveWebWallet extends Bridge {
	constructor(appInfo?: { name: string, logo: string }, url?: string,) {
		super({ ...appInfo, app: 'arweave', version: '1.0.0' }, url)
	}

	async getPublicKey(): Promise<string> {
		const res = await this.postMessage({ method: 'getPublicKey' })
		if (!is<string>(res)) { throw 'TypeError' }
		return res
	}

	async getArweaveConfig(): Promise<ApiConfig> {
		const res = await this.postMessage({ method: 'getArweaveConfig' })
		type ReceivedApiConfig = Omit<ApiConfig, 'logger'> & { logger: any }
		if (!is<ReceivedApiConfig>(res)) { throw 'TypeError' }
		delete res.logger
		return res
	}

	async signTransaction(tx: Transaction): Promise<Transaction> {
		const res = await this.postMessage({ method: 'signTransaction', params: tx })
		if (!is<{ signature: string, fee?: string }>(res)) { throw 'TypeError' }
		tx.signature = res.signature
		if (res.fee) { tx.fee = res.fee } // todo only if not bundle data transaction?
		return tx
	}

	async getUploader(tx: Transaction | SerializedUploader | string, data?: Uint8Array | ArrayBuffer): Promise<TransactionUploader> {
		const api = await this.getArweaveConfig()
		const arweave = Arweave.init(api)
		return arweave.transactions.getUploader(tx, data)
	}

	async sign(): Promise<string> { throw '' }

	async decrypt(): Promise<string> { throw '' }
}
