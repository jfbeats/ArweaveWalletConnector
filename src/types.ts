export type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type Override<T, U> = Omit<T, keyof U> & U
export type Null = null | undefined

type ProvideResult<T> = T extends (...a: any) => any ? Awaited<ReturnType<T>> : never
export type FromProvider<C> = { [Property in keyof C]: ProvideResult<C[Property]> }

type VerifyParams<T> = T extends (...a: any) => any ? (...a: Parameters<T>) => boolean : never
export type AsVerifier<C> = { [Property in keyof C]: VerifyParams<C[Property]> }

export type AppInfo = {
    name?: string
    logo?: string
    iframeParentNode?: Node
}

export type ProtocolInfo = {
	protocol?: string
	version?: string
}