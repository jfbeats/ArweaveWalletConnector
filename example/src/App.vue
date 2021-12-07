<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<!-- link to: baseSourceUrl + /example/ + path -->
		<!-- const wallet = new ArweaveWebWallet({ name: 'Connector Example', logo: `${location.href}placeholder.svg` }) -->
		<WalletSelector class="wallet-selector" />
		<!-- wallet.setUrl({{ inputUrl }}) -->
		<div>The connector module itself has no visual element included. This page is an example on how it can be integrated</div>
		<button>View on Github</button>
		<section v-if="currentStep >= 1" id="s1" class="section">
			<div>{{ wallet.address }}</div>
			<!-- wallet.sign({{ data }}) -->
			<button v-if="wallet.address" @click="signTransaction">Sign Transaction</button>
		</section>

	</div>
</template>



<script setup lang="ts">
import ArweaveOutlineLogo from './components/ArweaveOutlineLogo.vue'
import WalletSelector from './components/WalletSelector.vue'
import Arweave from 'arweave'
import { ref, computed, watch } from 'vue'

// Here, we import an instance of a wrapper class made for the Vue
// reactivity engine instead of importing the connector directly
import { wallet } from './ReactiveWallet'

const signTransaction = async () => {
	const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
	try {
		const transaction = await arweave.createTransaction({
			quantity: '100000000000',
			owner: wallet.address,
			target: 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE',
			data: 'hello world',
		})
		transaction.addTag('App-Name', 'Donate to the developer')
		transaction.addTag('Tag-1', 'transaction tags are all displayed here')
		transaction.addTag('Tag-2', 'this is a real transaction')
		transaction.addTag('Tag-3', 'it will only be sent by clicking accept')
		await wallet.signTransaction(transaction)
	} catch (e) { console.error(e); wallet.error = e as string }
}



const inputUrl = ref('')
const currentStep = computed(() => {
	const conditions = [
		wallet.address
	]
	let step = 0
	while (conditions[step]) { step++ }
	return step
})
watch(currentStep, (val, oldVal) => {
	if (val <= oldVal) { return }
	setTimeout(() => document.querySelector('#s' + val)?.scrollIntoView({ behavior: 'smooth' }))
})
</script>



<style scoped>
.app {
	--app-spacing: 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--app-spacing);
	padding-bottom: 0;
}

.app > * + * {
	margin-block-start: var(--app-spacing);
}

.section {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.section > * + * {
	margin-block-start: var(--app-spacing);
}

.logo {
	height: 400px;
	opacity: 0.9;
}

.wallet-selector {
	position: sticky;
	top: calc(var(--app-spacing) / 2);
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
	line-height: 2;
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

.no-scrollbar {
	scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
	display: none;
}
</style>