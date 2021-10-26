import mitt from 'mitt'

export default class Emitter {
	private emitter = mitt()
	protected emit(method: string, params?: unknown) { this.emitter.emit(method, params) }
	on(method: string, handler: (params?: any) => void) { this.emitter.on(method, handler) }
	off(method: string, handler: (params?: any) => void) { this.emitter.off(method, handler) }
	once: Emitter['on'] = (method, handler) => {
		const wrapper = (params: unknown) => {
			this.emitter.off(method, wrapper)
			handler(params)
		}
		this.emitter.on(method, wrapper)
	}
}