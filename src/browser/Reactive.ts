import { AppInfo } from '../types.js'
import BrowserConnector from './Connector.js'



export type State = {
	url?: string
	address?: string
	connected: boolean
	showIframe: boolean
	usePopup: boolean
	requirePopup: boolean
	keepPopup: boolean
}

type StateFunction <T> = (state: T) => any
type Ref<T> = { value: T }
type VueRef <T> = Ref<T | undefined>
type SvelteStore <T> = { subscribe: (param: StateFunction<T>) => any, set: StateFunction<T> }
type ReactState <T> = [state: T, setState: StateFunction<T>]
type AnyReactive <T> = T | VueRef<T> | SvelteStore<T> | ReactState<T>
type Options = {
	state?: AnyReactive<Partial<State>>
	localStorageKey?: string | false
}



export class ReactiveConnector extends BrowserConnector {
	static #instance: ReactiveConnector
	#state!: { value: State }
	#setState?: (state: State) => any
	#subs = [] as any[]
	#localStorageKey = 'arweave-wallet-connector:URL' as string | false
	constructor (appInfo?: AppInfo, options?: Options) {
		super(appInfo, parseState(options?.state)?.url)
		this.setState(options?.state)
		if (ReactiveConnector.#instance) { return ReactiveConnector.#instance }
		ReactiveConnector.#instance = this
		let isUnloading = false
		this.on('connect', (address) => {
			const url = super.url
			this.updateState({ address, url, connected: true })
			if (this.#localStorageKey) { localStorage.setItem(this.#localStorageKey, url ?? '') }
		})
		this.on('disconnect', () => {
			this.updateState({ address: undefined, connected: false })
			if (this.#localStorageKey && !isUnloading) { localStorage.removeItem(this.#localStorageKey) }
		})
		const events = ['showIframe', 'usePopup', 'requirePopup', 'keepPopup'] as const
		events.forEach(event => this.on(event, val => this.updateState({ [event]: val })))
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', () => isUnloading = true)
			window.addEventListener('unload', () => isUnloading = true)
			if (options?.localStorageKey != undefined) { this.#localStorageKey = options.localStorageKey }
			if (this.#localStorageKey) {
				const reconnect = localStorage.getItem(this.#localStorageKey)
				if (reconnect) { this.setUrl(reconnect, true) }
				localStorage.removeItem(this.#localStorageKey)
			}
		}
	}
	get state () { return this.#state.value }
	get url () { return this.#state.value.url }
	get address () { return this.#state.value.address }
	get connected () { return this.#state.value.connected }
	get showIframe () { return this.#state.value.showIframe}
	get usePopup () { return this.#state.value.usePopup}
	get requirePopup () { return this.#state.value.requirePopup}
	get keepPopup () { return this.#state.value.keepPopup }
	set keepPopup (value) { super.keepPopup = value }
	connect (options?: object) {
		if (this.url && this.url !== super.url) { super.setUrl(this.url) }
		return super.connect(options)
	}
	setState <T extends AnyReactive<Partial<State>> | undefined> (state: T) {
		const instance = ReactiveConnector.#instance ?? this
		if (state && Array.isArray(state)) { instance.#setState = state[1] }
		if (state && 'set' in state) { instance.#setState = state.set }
		const init = initState(state)
		instance.#state = init.state
		if (Object.keys(init.newProps).length) { instance.updateState(init.newProps) }
		return state
	}
	subscribe (handler: StateFunction<State>) {
		this.#subs.push(handler)
		handler(this.#state.value)
		return () => this.#subs.filter(sub => sub !== handler)
	}
	private updateState (state?: Partial<State>) {
		if (!state) { return }
		Object.assign(this.#state.value, state)
		if (this.#setState) { this.#setState({ ...this.#state.value }) }
		this.#subs.forEach(sub => sub(this.#state.value))
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
	const defaultState: State = {
		connected: false,
		showIframe: false,
		usePopup: false,
		requirePopup: false,
		keepPopup: false,
	}
	const newProps = {} as Partial<State>
	for (const key in defaultState) {
		if ((state as any)[key] == undefined) {
			;(newProps as any)[key] = (defaultState as any)[key]
			;(state as any)[key] = (defaultState as any)[key]
		}
	}
	return { state: state as State, newProps }
}