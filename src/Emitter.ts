import mitt from 'mitt'

type Map = {
	connect: string
	disconnect: undefined
	change?: string
	usePopup: boolean
	keepPopup: boolean
}

type Params<T extends string> = T extends keyof Map ? Map[T] : unknown | undefined
type Handler<T extends string> = (params: Params<T>) => void

export default class Emitter {
	private emitter = mitt<Map>()
	protected emit<T extends string>(method: T, params: Params<T>) { this.emitter.emit(method as any, params) }
	on<T extends string>(method: T, handler: Handler<T>) { this.emitter.on(method as any, handler) }
	off<T extends string>(method: T, handler: Handler<T>) { this.emitter.off(method as any, handler) }
	once<T extends string>(method: T, handler?: Handler<T>) {
		return new Promise(resolve => {
			const wrapper: Handler<T> = (e) => { 
				this.off(method, wrapper) 
				resolve(e)
				if (handler) { handler(e) }
			}
			this.on(method, wrapper)
		})
	}
}