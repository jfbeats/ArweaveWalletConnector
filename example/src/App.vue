<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<!-- link to: baseSourceUrl + /example/ + path -->
		<WalletSelector v-model="inputUrl" class="wallet-selector" />
		<CodeBox :code="code[0]" />
		<div>The connector module itself has no visual element included. This page is an example on how it can be integrated</div>
		<a class="button" href="https://github.com/jfbeats/ArweaveWalletConnector"><Github /><span>View on Github</span></a>
		<section v-if="currentStep >= 1" id="s1" class="section">
			<div class="ellipsis">
				<p>Currently connected to:</p>
				{{ wallet.address }}
			</div>
			<button v-if="wallet.address" @click="signTransaction">Sign Transaction</button>
			<CodeBox :code="code[1]" />
		</section>
	</div>
</template>



<script setup lang="ts">
import ArweaveOutlineLogo from './components/ArweaveOutlineLogo.vue'
import WalletSelector from './components/WalletSelector.vue'
import CodeBox from './components/CodeBox.vue'
import Github from './components/Github.vue'
import Arweave from 'arweave'
import { reactive, ref, computed, watch } from 'vue'

// Here, we import an instance of a wrapper class made for the Vue
// reactivity engine instead of importing the connector directly
import { wallet } from './ReactiveWallet'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })

const transactionData = reactive({
	quantity: '100000000000',
	target: 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE',
	data: 'hello world',
})

const signTransaction = async () => {
	try {
		const transaction = await arweave.createTransaction({ ...transactionData })
		transaction.addTag('App-Name', 'Donate to the developer')
		transaction.addTag('Tag-1', 'transaction tags are all displayed here')
		transaction.addTag('Tag-2', 'this is a real transaction')
		transaction.addTag('Tag-3', 'it will only be sent by clicking accept')
		await wallet.signTransaction(transaction)
	} catch (e) { console.error(e); wallet.error = e as string }
}


// const location = window.location
const inputUrl = ref(wallet.url)
const currentStep = computed(() => {
	const conditions = [
		wallet.address
	]
	let step = 0
	while (conditions[step]) { step++ }
	return step
})
watch(currentStep, async (val, oldVal) => {
	if (val <= oldVal) { return }
	while (document.hidden) { await new Promise<void>(r => setTimeout(() => r(), 100)) }
	setTimeout(() => document.querySelector('#s' + val)?.scrollIntoView({ behavior: 'smooth' }), 300)
})

const displayNum = (num: any) => {
	const FractionDigits = new Intl.NumberFormat(navigator.languages as any, { maximumFractionDigits: 3 }).format(num)
	const SignificantDigits = new Intl.NumberFormat(navigator.languages as any, { maximumSignificantDigits: 1 }).format(num)
	return FractionDigits.length >= SignificantDigits.length ? FractionDigits : SignificantDigits
}

const txToString = (obj: any) => Object.entries(obj).reduce((acc, e) => acc + `	${e[0]}: '${e[1]}'${ e[0]=='quantity' ? ` // ${ displayNum(arweave.ar.winstonToAr(e[1] as string)) } AR` : '' }\n`, '')

const code = computed(() => [
`import { ArweaveWebWallet } from 'arweave-wallet-connector'
const wallet = new ArweaveWebWallet({
	name: 'Connector Example',
	logo: '${location.href}placeholder.svg'
})
wallet.setUrl('${inputUrl.value}')`,

`const transaction = await arweave.createTransaction({
${txToString(transactionData)}})
await wallet.signTransaction(transaction)`,
])
</script>



<style scoped>
.app {
	--app-spacing: 48px;
	--spacing: 2em;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--app-spacing);
}

@media (max-width: 599px) {
	.app {
		--app-spacing: 24px;
		--spacing: 1.5em;
	}
}

@media (max-width: 399px) {
	.app {
		--app-spacing: 12px;
	}
}

.app > * + * {
	margin-block-start: var(--app-spacing);
}

.section {
	min-height: 100vh;
	width: 100%;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.section > * + * {
	margin-block-start: var(--app-spacing);
}

.logo {
	max-height: min(400px, 40vh);
	opacity: 0.9;
}

.wallet-selector {
	position: sticky;
	top: var(--app-spacing);
	z-index: 1;
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

a.button {
	font-size: 0.8em;
	opacity: 0.75;
	color: inherit;
	text-decoration: none;
	padding: 1em 1.5em 1em 1em;
	background: #202020;
	border-radius: 1em;
	display: flex;
	align-items: center;
}

a.button > * + * {
	margin-inline-start: 1.5em;
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

.ellipsis {
	text-overflow: ellipsis;
    overflow: hidden;
}
</style>