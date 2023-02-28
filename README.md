# Arweave Wallet Connector

## Live Demo

The connector module itself does not include visual components and is independent of any javascript framework.

See an example of user flow you can build with it: https://jfbeats.github.io/ArweaveWalletConnector/

## How does it work

A user browse to WEBSITE where a transaction needs to be authorized in order to proceed. The private keys are held by arweave.app, safely kept in the browser storage and out of the reach of other websites.

1. Install - In order for WEBSITE to let the user authorize interactions with the arweave network without having to access the private keys directly, the WEBSITE developer installs the connector in their application. The module only includes the logic required to send and receive messages securely and directly between web pages loaded on the user computer
2. Connect - WEBSITE asks the user to select a URL where their private keys are located. They select `arweave.app` and the connector now loads up the page to let the user accept or reject the connection. Once accepted, the user address is shared to WEBSITE, which is now able to send and receive requests
3. Authorize - WEBSITE now sends a request to arweave.app, asking for a transaction signature and provides the new unsigned transaction info along with it. Using the data provided, arweave.app displays everything required for the user to make an informed decision, either to agree and return the signed transaction, or reject and return an error message. It's like metamask but in web3

## What is it

The connector is a final link to permanent account managers. Users are not required to install anything and are not restricted to specific device types or operating systems. The system relies on no 3rd party and, once implemented, enables any web page to connect to any wallet provider respecting the standard. This module effectively and permanently provides a communication protocol between decentralized applications hosted on arweave or normal web pages. It leverages web technologies to setup a bridge working entirely on the user device, and even offline if the web apps support it.

## Features

For everyone:
- Forever free
- Can handle requests in the background ***

For your users:
- No install required
- Available on any device, including mobile

For developers:
- Does not depend on any infrastructure (no api key)
- Final - no breaking changes, only improvements
- Fully typed
- Compatible with [arweave-js](https://github.com/ArweaveTeam/arweave-js)
- Compatible with other tools instantiated using an [arweave-js](https://github.com/ArweaveTeam/arweave-js) api object (e.g. smartweave clients)
- Compatible with anything else using the injected `window.arweaveWallet` object
- Most secure - includes built-in bidirectional type validation at runtime to filter out external messages with unexpected formats
- Does not require managing permissions - handled by the wallet provider
- Emits events for any property value change - listen using `wallet.on('event', callback)`

For wallets developers:
- Uses the [JSON RPC](https://www.jsonrpc.org/specification) api standard internally
- Offers prebuilt runtime types validation that can be imported

<sub>*** Brave is currently the only browser requiring users to manually set `all cookies allowed` in the shields menu in order to let the iframe access its own saved settings. Wallet providers can choose how they handle such cases where background functionality is unavailable. For arweave.app specifically, the window popup stays opened.</sub>

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

### Once connected

After the user has completed the connection flow (sucessful `wallet.connect()`), the connector will begin to receive instructions sent to the `window.arweaveWallet` object from arweave-js, smartweave clients, etc. On disconnect, it will restore any previously available endpoint injected by browser extensions

## Reactive Javascript Frameworks

The module doesn't import any framework component but provides ways to make the instance properties reactive

### For Vue

Pass a `ref` or a `reactive` object instance. The wallet properties will become reactive and can be used in templates

```html
<script setup>
const state = ref({ url: 'arweave.app' })
const wallet = new ArweaveWebWallet({ /* ... */ }, { state })
</script>

<template>
    <p @click="() => wallet.connect()">Connect</p>
    <p>{{ wallet.address }}</p>
</template>
```

[Address bar component](example/src/components/WalletSelector.vue)

### For Svelte

Use `$wallet` in your components

```html
<script>
const state = { url: 'arweave.app' }
const wallet = new ArweaveWebWallet({ /* ... */ }, { state })
</script>

<div>
    <p on:click={() => wallet.connect()}>Connect</p>
    <p>{$wallet.address}</p>
</div>
```

### For React

Call `wallet.setState(useState(wallet.state))` in your component and the wallet will use the hook

```js
const state = { url: 'arweave.app' }
const wallet = new ArweaveWebWallet({ /* ... */ }, { state })

function App () {
    wallet.setState(useState(wallet.state))
    return (
        <div>
            <p onClick={() => wallet.connect()}>Connect</p>
            <p>{wallet.address}</p>
        </div>
    )
}
```

## Wallet Server

If your app is running in a context with the ability to create a web socket server (node, native apps, etc.), it is possible to communicate to wallet providers through that link 

### Node.js

From a server running on the local machine. For example, can be used to request a service fee or data upload

```js
import { ArweaveWalletServer } from 'arweave-wallet-connector/lib/node'
const wallet = new ArweaveWalletServer('arweave.app')
await wallet.connect()
await wallet.signTransaction( /* ... */ )
```







