# Arweave Wallet Connector

WIP - API may change

## Demo

The connector module itself has no visual element included. Here is how users can interract with it:
https://jfbeats.github.io/ArweaveWalletConnector/

## Info

The connector is a final link to permanent account managers. Users are not required to install anything and are not restricted to specific device types or operating systems. The protocol is context agnostic and can therefore be used on desktop, mobile or anything else that includes a web browser. The system relies on no 3rd party and, once implemented, enables any web page to connect to any wallet provider respecting the standard. This module effectively and permanently provides a communication protocol between decentralized applications hosted on arweave or normal web pages. It leverages web technologies to provide a bridge working entirely on the user device, and even offline if the web apps support it.

## How to use

As of now [arweave.app](https://arweave.app) is the only provider so it is recommended to have it as default

```js
npm i arweave-wallet-connector

import { ArweaveWebWallet } from 'arweave-wallet-connector'

const wallet = new ArweaveWebWallet({
	name: 'Your application name',
	logo: 'Url of your logo to be displayed to users'
})
wallet.setUrl('Url of the wallet provider to connect to')
```

### For Vue developpers

[Reactive wrapper for the Wallet class](example/src/ReactiveWallet.ts)

[Address bar component](example/src/components/WalletSelector.vue)
