import { AppInfo } from '../types.js'
import BrowserConnector from './Connector.js'



export type State = {
	url?: string
	address?: string
	keepPopup: boolean
}

type Ref<T> = { value: T }
type Options = {
	state?: Partial<State> | Ref<Partial<State> | undefined> | [state: Partial<State>, setState: (state: Partial<State>) => any]
	localStorageKey?: string | false
}



export class ReactiveConnector extends BrowserConnector {
	static #instance: ReactiveConnector
	#state!: { value: State }
	#setState?: (state: State) => any
	localStorageKey = 'arweave-wallet-connector:URL' as string | false
	constructor (appInfo?: AppInfo, options?: Options) {
		super(appInfo, parseState(options?.state)?.url)
		if (ReactiveConnector.#instance) { return ReactiveConnector.#instance }
		ReactiveConnector.#instance = this
		this.#state = initState(options?.state)
		if (options?.state && Array.isArray(options.state)) { this.#setState = options.state[1] }
		let isUnloading = false
		window.addEventListener('beforeunload', () => isUnloading = true)
		window.addEventListener('unload', () => isUnloading = true)
		this.on('connect', (address) => {
			const url = this.url
			this.setState({ address, url })
			if (this.localStorageKey) { localStorage.setItem(this.localStorageKey, url ?? '') }
		})
		this.on('disconnect', () => {
			this.setState({ address: undefined })
			if (this.localStorageKey && !isUnloading) { localStorage.removeItem(this.localStorageKey) }
		})
		this.on('keepPopup', (keepPopup) => this.setState({ keepPopup }))
		if (options?.localStorageKey != undefined) { this.localStorageKey = options.localStorageKey }
		if (this.localStorageKey) {
			const reconnect = localStorage.getItem(this.localStorageKey)
			if (reconnect) { this.setUrl(reconnect) }
			localStorage.removeItem(this.localStorageKey)
		}
	}
	get state () { return this.#state.value }
	get url () { return this.#state.value.url }
	get address () { return this.#state.value.address }
	get keepPopup () { return this.#state.value.keepPopup }
	set keepPopup (value) { super.keepPopup = value }
	private setState (state?: Partial<State>) {
		if (!state) { return }
		if (this.#setState) { return this.#setState({ ...this.#state.value, ...state }) }
		Object.assign(this.#state.value, state)
	}
}



function parseState (state?: Options['state']): Partial<State> | undefined {
	if (!state) { return }
	return Array.isArray(state) ? state[0]
		: 'value' in state ? state.value
		: state
}

function initState (state?: Options['state']): Ref<State> {
	const defaultState: State = { keepPopup: false }
	if (!state) { return { value: defaultState } }
	let result: Ref<State>
	if (Array.isArray(state)) {
		result = { value: applyDefaults(state[0]) }
	} else if ('value' in state) {
		result = applyDefaultsRef(state)
	} else {
		result = { value: applyDefaults(state) }
	}
	return result
}

function applyDefaults (state: Partial<State>): State {
	const defaultState: State = { keepPopup: false }
	for (const key in defaultState) { (state as any)[key] ??= (defaultState as any)[key] }
	return state as State
}

function applyDefaultsRef (state: Ref<Partial<State> | undefined>): Ref<State> {
	state.value ??= {}
	applyDefaults(state.value)
	return state as Ref<State>
}