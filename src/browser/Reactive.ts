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
	private static _instance: ReactiveConnector
	private _state!: { value: State }
	private _setState?: (state: State) => any
	private _subs = [] as any[]
	private _localStorageKey = 'arweave-wallet-connector:URL' as string | false
	constructor (appInfo?: AppInfo, options?: Options) {
		super(appInfo, parseState(options?.state)?.url)
		this.setState(options?.state)
		if (ReactiveConnector._instance) { return ReactiveConnector._instance }
		ReactiveConnector._instance = new Proxy(this, {
			get: (target: any, p: string | symbol, receiver: any) => {
				return (p in target._state.value) ? target._state.value[p] : target[p]
			},
			set: (target, p, value, receiver) => {
				if (p === 'keepPopup') { super.keepPopup = value }
				else { target[p] = value }
				return true
			}
		})
		let isUnloading = false
		this.on('connect', (address) => {
			const url = super.url
			this.updateState({ address, url, connected: true })
			if (this._localStorageKey) { localStorage.setItem(this._localStorageKey, url ?? '') }
		})
		this.on('disconnect', () => {
			this.updateState({ address: undefined, connected: false })
			if (this._localStorageKey && !isUnloading) { localStorage.removeItem(this._localStorageKey) }
		})
		const events = ['showIframe', 'usePopup', 'requirePopup', 'keepPopup'] as const
		events.forEach(event => this.on(event, val => this.updateState({ [event]: val })))
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', () => isUnloading = true)
			window.addEventListener('unload', () => isUnloading = true)
			if (options?.localStorageKey != undefined) { this._localStorageKey = options.localStorageKey }
			if (this._localStorageKey) {
				const reconnect = localStorage.getItem(this._localStorageKey)
				if (reconnect) { this.setUrl(reconnect, true) }
				localStorage.removeItem(this._localStorageKey)
			}
		}
		return ReactiveConnector._instance
	}
	override setUrl = (connectToUrl: string | URL, load?: boolean) => {
		super.setUrl(connectToUrl, load);
		this.updateState({ url: super.url })
	}
	subscribe = (handler: StateFunction<State>) => {
		this._subs.push(handler)
		handler(this._state.value)
		return () => this._subs.filter(sub => sub !== handler)
	}
	private setState = <T extends AnyReactive<Partial<State>> | undefined> (state: T) => {
		const instance = ReactiveConnector._instance ?? this
		if (state && Array.isArray(state)) { instance._setState = state[1] }
		if (state && 'set' in state) { instance._setState = state.set }
		const init = initState(state)
		instance._state = init.state
		if (Object.keys(init.newProps).length) { instance.updateState(init.newProps) }
		return state
	}
	private updateState = (state?: Partial<State>) => {
		if (!state) { return }
		Object.assign(this._state.value, state)
		if (this._setState) { this._setState({ ...this._state.value }) }
		this._subs.forEach(sub => sub(this._state.value))
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
		url: undefined,
		address: undefined,
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