type Flatten<T> = T extends Record<string, any> ? { [k in keyof T]: T[k] } : never
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never