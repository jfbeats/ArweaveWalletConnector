export type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type AppInfo = {
	name?: string
	logo?: string
}

export type ProtocolInfo = {
	protocol?: string
	version?: string
}