import Arweave from 'arweave'
import { ApiConfig } from 'arweave/node/lib/api'
import type Transaction from 'arweave/node/lib/transaction'
import { SerializedUploader, TransactionUploader } from 'arweave/node/lib/transaction-uploader'

import Bridge from './Bridge'

export class ArweaveWebWallet extends Bridge {
	constructor(appInfo?: { name: string, logo: string }, url?: string,) {
		super({ ...appInfo, app: 'arweave' }, url)
	}

	async getPublicKey(): Promise<string> {
		const res = await this.postMessage({ method: 'getPublicKey' })
		if (typeof res !== 'string') { throw '' }
		return res
	}

	async getArweaveConfig(): Promise<ApiConfig> {
		const res = await this.postMessage({ method: 'getArweaveConfig' })
		throw '' 
	}

	async signTransaction(tx: Transaction): Promise<Transaction> {
		const res = await this.postMessage({ method: 'signTransaction', params: tx })
		throw ''
	}

	async getUploader(tx: Transaction | SerializedUploader | string, data?: Uint8Array | ArrayBuffer): Promise<TransactionUploader> {
		const api = await this.getArweaveConfig()
		const arweave = Arweave.init(api)
		return arweave.transactions.getUploader(tx, data)
	}

	async sign(): Promise<string> { throw '' }

	async decrypt(): Promise<string> { throw '' }
}
