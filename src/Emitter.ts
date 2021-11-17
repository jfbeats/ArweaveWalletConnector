import mitt from 'mitt'
import { is } from 'typescript-is'

export default class Emitter<Events extends Record<string, unknown>> {
	private mittInstance
	on
	off

	constructor() {
		this.mittInstance = mitt<Events>()
		this.on = this.mittInstance.on
		this.off = this.mittInstance.off
	}

	protected emit<Method extends string>(method: Method, params: Events[Method]) {
		if (!is<Events[Method]>(params)) { return }
		this.mittInstance.emit(method, params)
	}
}