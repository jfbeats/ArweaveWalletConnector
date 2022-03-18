import { ArweaveApi } from './Arweave.js'
import Connector from './browser/Connector.js'

export type { AppInfo } from './types'

export const ArweaveWebWallet = ArweaveApi(Connector)