import { ArweaveApi } from '../Arweave.js'
import WebSockets from './WebSocket.js'

export const ArweaveWalletServer = ArweaveApi(WebSockets)