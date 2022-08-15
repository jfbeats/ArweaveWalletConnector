import { Tag } from './utils/ArweaveTag.js'
import { is } from 'typescript-is'
import type { FromProvider, AsVerifier, Override, Null, ConnectionConstructor, PostMessageOptions } from './types'
import type Transaction from 'arweave/web/lib/transaction'
import type { TransactionInterface } from 'arweave/web/lib/transaction'
import type { ApiConfig } from 'arweave/web/lib/api'

// todo find a way to verify that file name extension for import is always specified

interface SerializedTx extends Override<TransactionInterface, {
	tags: { name: string, value: string }[]
	data: any
}> {}
type DecryptOptions = AlgorithmIdentifier | Override<RsaOaepParams, { label?: string }>
export type DispatchResult = {
	id?: string
	type?: 'BASE' | 'BUNDLED'
}



export interface ArweaveInterface {
	getPublicKey(): Promise<string>
	getArweaveConfig(): Promise<Omit<ApiConfig, 'logger'>>
	signTransaction(tx: Transaction, options?: object | Null): Promise<Transaction>
	dispatch(tx: Transaction, options?: object | Null): Promise<DispatchResult>
	decrypt(message: ArrayBufferView, options: DecryptOptions): Promise<ArrayBufferView>
}
export interface ArweaveProviderInterface extends Override<ArweaveInterface, {
	getArweaveConfig(): Promise<Override<ApiConfig, { logger?: any }>>
	signTransaction(tx: Partial<SerializedTx>, options?: object | Null): Promise<{
		id: string, owner?: string | Null, tags?: SerializedTx['tags'] | Null, signature: string, reward?: string | Null }>
	dispatch(tx: Partial<SerializedTx>, options?: object | Null): Promise<DispatchResult>
}> {}
interface FromArweaveProvider extends FromProvider<ArweaveProviderInterface> {}



export function ArweaveApi<TBase extends ConnectionConstructor>(Base: TBase) {
	return class Arweave extends Base implements ArweaveInterface {
		constructor(...args: any[]) { super(...args) }

		namespaces = {
			arweaveWallet: {
				walletName: 'ArConnect',
				connect: () => this.address || this.connect(),
				disconnect: () => this.disconnect(),
				getActiveAddress: () => this.address,
				getActivePublicKey: () => this.getPublicKey(),
				getAllAddresses: () => { throw 'not implemented' },
				getWalletNames: () => { throw 'not implemented' },
				sign: (tx: Transaction, options?: any) => this.signTransaction(tx, options),
				dispatch: (tx: Transaction, options?: any) => this.dispatch(tx, options),
				encrypt: () => { throw 'not implemented' },
				decrypt: (data: Uint8Array, options: any) => this.decrypt(data, options),
				getPermissions: () => ["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY", "ACCESS_ALL_ADDRESSES", "SIGN_TRANSACTION", "ENCRYPT", "DECRYPT", "SIGNATURE", "ACCESS_ARWEAVE_CONFIG", "DISPATCH",],
				getArweaveConfig: () => this.getArweaveConfig(),
			},
		}

		postMessage(method: string, params?: any[], options?: PostMessageOptions) {
			return super.postMessage(method, params, { ...options, protocol: 'arweave', version: '1.0.0' })
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
			const { data, chunks, ...txHeader } = tx
			const res = await this.postMessage('signTransaction', [txHeader, options])
			if (!is<FromArweaveProvider['signTransaction']>(res)) { throw 'TypeError' }
			tx.setSignature({
				id: res.id,
				owner: res.owner || tx.owner,
				tags: res.tags?.map(tag => new Tag(tag.name, tag.value, true)),
				signature: res.signature,
				reward: res.reward || undefined
			})
			return tx
		}

		async dispatch(tx: Transaction, options?: object | Null) {
			const res = await this.postMessage('dispatch', [tx, options], { transfer: true })
			if (!is<FromArweaveProvider['dispatch']>(res)) { throw 'TypeError' }
			return res
		}

		async decrypt<T extends ArrayBufferView>(message: T, options: DecryptOptions) {
			const res = await this.postMessage('decrypt', [message, options])
			if (!ArrayBuffer.isView(res)) { throw 'TypeError' }
			const constructor = message.constructor as new (p: any) => typeof message
			return new constructor(res.buffer)
		}
	}
}



export class ArweaveVerifier implements AsVerifier<ArweaveProviderInterface> {
	getPublicKey() { return true }
	getArweaveConfig() { return true }
	signTransaction(tx: Partial<SerializedTx>, options?: object | Null) { return is<typeof tx>(tx) && is<typeof options>(options) }
	dispatch(tx: Partial<SerializedTx>, options?: object | Null) { return is<typeof tx>(tx) && ArrayBuffer.isView(tx.data) && is<typeof options>(options) }
	decrypt(message: ArrayBufferView, options: DecryptOptions) { return ArrayBuffer.isView(message) && is<typeof options>(options) }
}