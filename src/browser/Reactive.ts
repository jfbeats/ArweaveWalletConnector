import { AppInfo } from '../types.js'
import BrowserConnector from './Connector.js'



export type State = {
	url?: string
	address?: string
	keepPopup: boolean
}
type StateFunction = (state: Partial<State>) => any
type Ref<T> = { value: T }
type WalletStateVueRef = Ref<Partial<State> | undefined>
type WalletStateSvelteStore = { subscribe: (param: StateFunction) => any, set: StateFunction }
type WalletStateReact = [state: Partial<State>, setState: StateFunction]
type Options = {
	state?: Partial<State> | WalletStateVueRef | WalletStateSvelteStore | WalletStateReact
	localStorageKey?: string | false
}



export class ReactiveConnector extends BrowserConnector {
	static #instance: ReactiveConnector
	#state!: { value: State }
	#setState?: (state: State) => any
	localStorageKey = 'arweave-wallet-connector:URL' as string | false
	constructor (appInfo?: AppInfo, options?: Options) {
		super(appInfo, parseState(options?.state)?.url)
		const instance = ReactiveConnector.#instance ?? this
		if (options?.state && Array.isArray(options.state)) { instance.#setState = options.state[1] }
		if (options?.state && 'subscribe' in options.state) { instance.#setState = options.state.set }
		const init = initState(options?.state)
		instance.#state = init.state
		if (Object.keys(init.newProps).length) { instance.setState(init.newProps) }
		if (ReactiveConnector.#instance) { return ReactiveConnector.#instance }
		ReactiveConnector.#instance = this
		let isUnloading = false
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
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', () => isUnloading = true)
			window.addEventListener('unload', () => isUnloading = true)
			if (options?.localStorageKey != undefined) { this.localStorageKey = options.localStorageKey }
			if (this.localStorageKey) {
				const reconnect = localStorage.getItem(this.localStorageKey)
				if (reconnect) { this.setUrl(reconnect) }
				localStorage.removeItem(this.localStorageKey)
			}
		}
	}
	get state () { return this.#state.value }
	get url () { return this.#state.value.url }
	get address () { return this.#state.value.address }
	get keepPopup () { return this.#state.value.keepPopup }
	set keepPopup (value) { super.keepPopup = value }
	private setState (state?: Partial<State>) {
		if (!state) { return }
		Object.assign(this.#state.value, state)
		if (this.#setState) { this.#setState({ ...this.#state.value }) }
	}
}



function parseState (state?: Options['state']): Partial<State> | undefined {
	if (!state) { return }
	if ('subscribe' in state) {
		let res = undefined as undefined | Partial<State>
		const unsub = state.subscribe(val => res = val)
		unsub?.()
		return res
	}
	return Array.isArray(state) ? state[0]
		: 'value' in state ? state.value
		: state
}

function initState (state?: Options['state']): { state: Ref<State>, newProps: Partial<State> } {
	let result: { state: Ref<State>, newProps: Partial<State> }
	if (!state) { result = applyDefaultsRef({ value: {} }) }
	else if (Array.isArray(state)) { result = applyDefaultsRef({ value: state[0] }) }
	else if ('value' in state) { result = applyDefaultsRef(state) }
	else if ('subscribe' in state) { result = applyDefaultsRef({ value: parseState(state) }) }
	else { result = applyDefaultsRef({ value: state }) }
	return result
}

function applyDefaultsRef (state: Ref<Partial<State> | undefined>) {
	state.value ??= {}
	const result = applyDefaults(state.value)
	return { state: state as Ref<State>, newProps: result.newProps }
}

function applyDefaults (state: Partial<State> = {}) {
	const defaultState: State = { keepPopup: false }
	const newProps = {} as Partial<State>
	for (const key in defaultState) {
		if ((state as any)[key] == undefined) {
			;(newProps as any)[key] = (defaultState as any)[key]
			;(state as any)[key] = (defaultState as any)[key]
		}
	}
	return { state: state as State, newProps }
}