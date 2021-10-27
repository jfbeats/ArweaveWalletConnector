import type Transaction from 'arweave/web/lib/transaction'
import Bridge from './Bridge'



export class WebWallet extends Bridge {
	constructor(appInfo: { name: string, logo: string }, url?: string,) {
		super({ ...appInfo, app: 'arweave' }, url)
	}

	async getPublicKey() { }

	async getArweaveConfig() { }

	async signTransaction(tx: Transaction) {
		const res = await this.postMessage({
			method: 'signTransaction',
			params: tx
		})
	}

	async sign() { }

	async decrypt() { }
}
