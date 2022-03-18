import type { PostMessageOptions } from "../types"

export class PromiseController {
	private _promiseController: {
		resolve: (value?: unknown) => void,
		reject: (reason?: unknown) => void
	}[] = []

	newMessagePromise (message: any, options?: PostMessageOptions) {
		message.id = this._promiseController.length
		const promise = new Promise((resolve, reject) => this._promiseController.push({ resolve, reject }))
		if (options?.timeout) { setTimeout(() => this._promiseController[message.id].reject('timeout'), options.timeout) }
		return promise
	}

	processResponse (message: object) {
		const { id, result, error } = message as { [key: string]: unknown }
		if (id == null) { return }
		if (typeof id !== 'number' && typeof id !== 'string') { throw 'error' }
		if (typeof id === 'string' && isNaN(parseInt(id))) { throw 'error' }
		if (!this._promiseController[+id]) { throw 'received result to nonexistent request' }
		if (error != null) { this._promiseController[+id].reject(error) }
		else { this._promiseController[+id].resolve(result) }
		return true
	}
}
