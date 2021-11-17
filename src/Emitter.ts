import mitt from 'mitt'

export default class Emitter<Events extends Record<string, unknown>> {
	private mittInstance
	on
	off

	constructor() {
		this.mittInstance = mitt<Events>()
		this.on = this.mittInstance.on
		this.off = this.mittInstance.off
	}

	protected emit<Method extends keyof Events>(method: Method, params: Events[Method]) {
		this.mittInstance.emit(method, params)
	}

	once<Method extends keyof Events>(method: Method, handler: (params: Events[Method]) => void) {
		return new Promise(resolve => {
			const wrapper: typeof handler = (e) => { 
				this.off(method, wrapper) 
				resolve(e)
				if (handler) { handler(e) }
			}
			this.on(method, wrapper)
		})
	}
}