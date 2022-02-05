# Arweave Wallet Connector

## Live Demo

The connector module itself has no visual element included.

See an example of user flow you can build with it: https://jfbeats.github.io/ArweaveWalletConnector/

## Info

The connector is a final link to permanent account managers. Users are not required to install anything and are not restricted to specific device types or operating systems. The system relies on no 3rd party and, once implemented, enables any web page to connect to any wallet provider respecting the standard. This module effectively and permanently provides a communication protocol between decentralized applications hosted on arweave or normal web pages. It leverages web technologies to setup a bridge working entirely on the user device, and even offline if the web apps support it.

## Features

- No install required for end users
- Available on any device, including mobile
- Can handle requests in the background ***
- Compatible with [arweave-js](https://github.com/ArweaveTeam/arweave-js)
- Compatible with other tools instantiated using an [arweave-js](https://github.com/ArweaveTeam/arweave-js) api object (e.g. smartweave clients)
- Compatible with anything else using the injected `window.arweaveWallet` object
- Most secure - includes built-in bidirectional type validation at runtime to filter out external messages with unexpected formats
- Does not require the developper to manage permissions requests - handled by the wallet provider
- Fully typed
- Emits events for any property value change - listen using `wallet.on('event', callback)`
- Uses the [JSON RPC](https://www.jsonrpc.org/specification) api standard internally

*** Brave is currently the only browser requiring users to manually set `all cookies allowed` in the shields menu in order to let the iframe access its own saved settings. Wallet providers can choose how they handle such cases where background functionality is unavailable. For arweave.app specifically, the window popup stays opened.

## Note

As of now, [arweave.app](https://arweave.app) is the only provider so it is recommended to offer it as a default option. Increase decentralization and permanence by allowing users to enter their own custom wallet URL. This will also let them use providers running on localhost in your application.

## How to use
Install from NPM:

```
npm i arweave-wallet-connector
```

Import / Create instance / Set the URL to connect to / Launch:

```js
import { ArweaveWebWallet } from 'arweave-wallet-connector'

const wallet = new ArweaveWebWallet({
	// optionally provide information about your app that will be displayed in the wallet provider interface
	name: 'Your application name',
	logo: 'URL of your logo to be displayed to users'
})

wallet.setUrl('URL of the wallet provider to connect to')
await wallet.connect() // on user gesture to avoid blocked popup
```

Once the connection is established, you can now choose between using the `wallet` object as seen in the [demo](https://jfbeats.github.io/ArweaveWalletConnector/) or use the Arconnect api format:

```js
const arconnectLikeAPI = wallet.namespaces.arweaveWallet
```

The connector will begin to receive instructions sent to the `window.arweaveWallet` object from arweave-js, smartweave clients, etc. On disconnect, it will restore any previously available endpoint injected by browser extensions

### For Vue developpers

[Reactive wrapper for the Wallet class](example/src/ReactiveWallet.ts)

[Address bar component](example/src/components/WalletSelector.vue)
