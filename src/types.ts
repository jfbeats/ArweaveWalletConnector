export type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type RunTypes<T extends (...a: any) => any> = (...a: Parameters<T>) => boolean
export type Verificator<C> = { [Property in keyof C]: C[Property] extends (...a: any) => any ? RunTypes<C[Property]> : never }

export type AppInfo = {
	name?: string
	logo?: string
}

export type ProtocolInfo = {
	protocol?: string
	version?: string
}