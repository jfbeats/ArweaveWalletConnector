import { ArweaveApi } from '../Arweave.js'
import { ReactiveConnector } from './Reactive.js'

export type { State } from './Reactive.js'
export const ArweaveWebWallet = ArweaveApi(ReactiveConnector)