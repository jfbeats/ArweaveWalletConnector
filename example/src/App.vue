<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<WalletSelector />
		<div v-if="walletData.address">{{ walletData.address }}</div>
		<button v-if="walletData.address" @click="signTransaction">Sign Transaction</button>
	</div>
</template>



<script lang="ts">
import ArweaveOutlineLogo from './components/ArweaveOutlineLogo.vue'
import WalletSelector from './components/WalletSelector.vue'
import { defineComponent } from 'vue'
import Arweave from 'arweave'

// import from a wrapper initializing the wallet and providing a managed reactive data source along with it
import { wallet, walletData } from './ReactiveWallet'

export default defineComponent({
	name: 'App',
	components: { ArweaveOutlineLogo, WalletSelector },
	setup() {

		const signTransaction = async () => {
			const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
			try {
				const transaction = await arweave.createTransaction({
					quantity: '100000000000',
					owner: walletData.address,
					target: 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE',
					data: 'hello world',
				})
				transaction.addTag('App-Name', 'Donate to the developer')
				transaction.addTag('Tag-1', 'transaction tags are all displayed here')
				transaction.addTag('Tag-2', 'this is a real transaction')
				transaction.addTag('Tag-3', 'it will only be sent by clicking accept')
				await wallet.signTransaction(transaction)
			} catch (e) { walletData.error = e as string }
		}

		return { walletData, signTransaction }
	},
})
</script>



<style scoped>
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 80px;
}

.app > * + * {
	margin-block-start: 80px;
}

.logo {
	height: 400px;
	opacity: 0.9;
}

button {
	color: inherit;
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	font-size: 1em;
	cursor: pointer;
	line-height: inherit;
	text-align: inherit;
}
</style>



<style>
html {
	background: #111;
	box-sizing: border-box;
}

body {
	margin: 0;
	padding: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ddd;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}
</style>