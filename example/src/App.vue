<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<WalletSelector @connect="connectConnector" @disconnect="disconnectConnector" :loading="data.loading" :connected="!!data.address" />
		<div>{{ data.address }}</div>
		<button v-if="data.address" @click="signTx">Sign Transaction</button>
	</div>
</template>



<script lang="ts">
import ArweaveOutlineLogo from './components/ArweaveOutlineLogo.vue'
import WalletSelector from './components/WalletSelector.vue'
import { defineComponent, reactive } from 'vue'
import Arweave from 'arweave'

// Import the wallet connector
import { WebWallet } from 'arweave-wallet-connector'

export default defineComponent({
	name: 'App',
	components: { ArweaveOutlineLogo, WalletSelector },
	setup() {
		const data = reactive({
			address: undefined as undefined | string,
			loading: false,
			error: '',
		})

		let wallet: WebWallet | null = null

		// Initialize the wallet from user submitted URL or preselected options
		const connectConnector = async (url: string) => {
			if (wallet) return
			wallet = new WebWallet(url, { name: 'Connector Example', logo: `${location.href}placeholder.svg` })
			const walletChange = (address?: string) => {
				data.loading = false
				data.address = address
				if (!address) { wallet = null }
			}
			wallet.on('connect', walletChange)
			wallet.on('disconnect', walletChange)
			data.loading = true
			wallet.connect()
		}

		const disconnectConnector = async () => {
			await wallet?.disconnect()
			wallet = null
		}

		const signTx = async () => {
			if (!wallet) return
			const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
			try {
				const transaction = await arweave.createTransaction({ data: 'hello' })
				await wallet.signTransaction(transaction)
			} catch (e) { console.log(e) }
		}

		return { data, connectConnector, disconnectConnector, signTx }
	},
})
</script>



<style scoped>
.app {
	--spacing: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--spacing);
}

.app > * + * {
	margin-block-start: var(--spacing);
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
</style>