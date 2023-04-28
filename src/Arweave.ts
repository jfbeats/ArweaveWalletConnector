import { ArweaveUtils, Tag } from './utils/ArweaveTag.js'
import type { FromProvider, AsVerifier, Override, Null, ConnectionConstructor, PostMessageOptions } from './types.js'
import type Transaction from 'arweave/web/lib/transaction.js'
// import type { DataItemCreateOptions } from 'arbundles'
import type { TransactionInterface } from 'arweave/web/lib/transaction.js'
import type { ApiConfig } from 'arweave/web/lib/api.js'
import { is } from 'typia'

// todo find a way to verify that file name extension for import is always specified

interface SerializedTx extends Override<TransactionInterface, {
	data: any
	tags: { name: string, value: string }[]
}> {}
interface DataItemCreateOptions {
	data?: never;
	target?: string;
	anchor?: string;
	tags?: {
		name: string;
		value: string;
	}[];
}
export interface DataItemParams extends Override<DataItemCreateOptions, {
	data?: string | Uint8Array | NodeJS.ReadableStream
	signature: string
}> {}
type DataItemParamsUnsigned = Omit<DataItemParams, 'signature'>
type SignAlgorithm = { signAlgorithm?: 'RSA' }
type HashAlgorithm = { hashAlgorithm?: 'SHA-256' | 'SHA-384' | 'SHA-512' }
type PrivateHashOptions = HashAlgorithm & { scoped?: false }
type DecryptOptions = AlgorithmIdentifier | Algorithm
type SignMessageOptions = HashAlgorithm
type VerifyMessageOptions = HashAlgorithm & SignAlgorithm
export type DispatchResult = {
	id?: string
	type?: 'BASE' | 'BUNDLED'
}



export interface ArweaveInterface {
	getPublicKey(): Promise<string>
	getArweaveConfig(): Promise<Omit<ApiConfig, 'logger'>>
	signTransaction(tx: Transaction, options?: object | Null): Promise<Transaction>
	signDataItem(tx: DataItemParamsUnsigned): Promise<ArrayBuffer>
	signMessage(message: ArrayBufferView, options: SignMessageOptions): Promise<ArrayBufferView>
	verifyMessage(message: ArrayBufferView, signature: ArrayBufferView, publicKey: string, options: VerifyMessageOptions): Promise<boolean>
	dispatch(tx: Transaction, options?: object | Null): Promise<DispatchResult>
	encrypt(message: ArrayBufferView, publicKey: string, options: DecryptOptions): Promise<ArrayBufferView>
	decrypt(message: ArrayBufferView, options: DecryptOptions): Promise<ArrayBufferView>
	privateHash(message: ArrayBufferView, options: HashAlgorithm): Promise<ArrayBufferView>
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
				signature: () => { throw 'deprecated, do not use' },
				sign: (tx: Transaction, options?: any) => this.signTransaction(tx, options),
				dispatch: (tx: Transaction, options?: any) => this.dispatch(tx, options),
				encrypt: async (data: Uint8Array, options: any) => {
					const key = await this.getPublicKey()
					return this.encrypt(data, key, options)
				},
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
		
		async signDataItem(tx: DataItemParamsUnsigned) {
			const res = await this.postMessage('signDataItem', [tx])
			if (!ArrayBuffer.isView(res)) { throw 'TypeError' }
			return res.buffer
		}

		async dispatch(tx: Transaction, options?: object | Null) {
			const res = await this.postMessage('dispatch', [tx, options], { transfer: true })
			if (!is<FromArweaveProvider['dispatch']>(res)) { throw 'TypeError' }
			return res
		}
		
		async signMessage<T extends ArrayBufferView>(message: T, options: SignMessageOptions) {
			const res = await this.postMessage('signMessage', [message, options])
			if (!ArrayBuffer.isView(res)) { throw 'TypeError' }
			const constructor = message.constructor as new (p: any) => typeof message
			return new constructor(res.buffer)
		}
		
		async verifyMessage(message: ArrayBufferView, signature: ArrayBufferView | string, publicKey: string, options: VerifyMessageOptions) {
			signature = typeof signature === 'string' ? ArweaveUtils.b64UrlToBuffer(signature) : signature
			const res = await this.postMessage('verifyMessage', [message, signature, publicKey, options])
			if (!is<FromArweaveProvider['verifyMessage']>(res)) { throw 'TypeError' }
			return res
		}
		
		async encrypt<T extends ArrayBufferView>(message: T, publicKey: string, options: DecryptOptions) {
			const res = await this.postMessage('encrypt', [message, publicKey, options])
			if (!ArrayBuffer.isView(res)) { throw 'TypeError' }
			const constructor = message.constructor as new (p: any) => typeof message
			return new constructor(res.buffer)
		}

		async decrypt<T extends ArrayBufferView>(message: T, options: DecryptOptions) {
			const res = await this.postMessage('decrypt', [message, options])
			if (!ArrayBuffer.isView(res)) { throw 'TypeError' }
			const constructor = message.constructor as new (p: any) => typeof message
			return new constructor(res.buffer)
		}
		
		async privateHash<T extends ArrayBufferView>(message: T, options: HashAlgorithm) {
			const res = await this.postMessage('privateHash', [message, options])
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
	signDataItem(tx: DataItemParamsUnsigned) { return is<typeof tx>(tx) }
	dispatch(tx: Partial<SerializedTx>, options?: object | Null) { return is<typeof tx>(tx) && ArrayBuffer.isView(tx.data) && is<typeof options>(options) }
	signMessage(message: ArrayBufferView, options: SignMessageOptions) { return ArrayBuffer.isView(message) && is<typeof options>(options) }
	verifyMessage(message: ArrayBufferView, signature: ArrayBufferView, publicKey: string, options: VerifyMessageOptions) { return ArrayBuffer.isView(message) && ArrayBuffer.isView(signature) && is<typeof publicKey>(publicKey) && is<typeof options>(options) }
	encrypt(message: ArrayBufferView, publicKey: string, options: DecryptOptions) { return ArrayBuffer.isView(message) && ArrayBuffer.isView(publicKey) && is<typeof options>(options) }
	decrypt(message: ArrayBufferView, options: DecryptOptions) { return ArrayBuffer.isView(message) && is<typeof options>(options) }
	privateHash(message: ArrayBufferView, options: HashAlgorithm) { return ArrayBuffer.isView(message) && is<typeof options>(options) }
}