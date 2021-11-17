import mitt from 'mitt'

export default class Emitter<Events extends Record<string, unknown>> {
	private mittInstance

	constructor() {
		this.mittInstance = mitt<Events>()
	}

	protected emit<Method extends keyof Events>(method: Method, params: Events[Method]) {
		this.mittInstance.emit(method, params)
	}

	on<Method extends keyof Events>(method: Method, handler: (params: Events[Method]) => void) {
		this.mittInstance.on(method, handler)
	}

	off<Method extends keyof Events>(method: Method, handler: (params: Events[Method]) => void) {
		this.mittInstance.off(method, handler)
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