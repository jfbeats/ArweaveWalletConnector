export type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type Override<T, U> = Omit<T, keyof U> & U

type ProvideResult<T> = T extends (...a: any) => any ? (...a: Parameters<T>) => Awaited<ReturnType<T>> : never
type Provider<C> = { [Property in keyof C]: ProvideResult<C[Property]> }
export type AsProvider<Base, Overrides> = Provider<Override<Base, Overrides>>

type VerifyParams<T> = T extends (...a: any) => any ? (...a: Parameters<T>) => boolean : never
export type AsVerifier<C> = { [Property in keyof C]: VerifyParams<C[Property]> }

export type AppInfo = {
	name?: string
	logo?: string
}

export type ProtocolInfo = {
	protocol?: string
	version?: string
}