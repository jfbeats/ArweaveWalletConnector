import mitt from 'mitt'
type Handler = (e: string) => any

export default class Emitter {
	private emitter = mitt()
	constructor() { }
	protected emit(type: string, value?: string) {
		if (value !== undefined && typeof value !== 'string') { return }
		this.emitter.emit(type, value)
	}
	on(type: string, handler: Handler) { this.emitter.on(type, handler as any) }
	off(type: string, handler: Handler) { this.emitter.off(type, handler as any) }
	once(type: string, handler: Handler) {
		const wrapper: Handler = (e) => {
			this.emitter.off(type, wrapper as any)
			handler(e)
		}
		this.emitter.on(type, wrapper as any)
	}
}