<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<!-- link to: baseSourceUrl + /example/ + path -->
		<WalletSelector v-model="inputUrl" class="wallet-selector" />
		<CodeBox code="npm install arweave-wallet-connector" />
		<CodeBox :code="code[0]" />
		<div style="text-align: justify; max-width: 800px;">The connector is a final link to permanent account managers. Users are not required to install anything and are not restricted to specific device types or operating systems. The system relies on no 3rd party and, once implemented, enables any web page to connect to any wallet provider respecting the standard. This module effectively and permanently provides a communication protocol between decentralized applications hosted on arweave or normal web pages. It leverages web technologies to setup a bridge working entirely on the user device, and even offline if the web apps support it. The connector module itself has no visual element included. This page is an example on how it can be integrated.</div>
		<a class="button" href="https://github.com/jfbeats/ArweaveWalletConnector">
			<Github />
			<span>View on Github</span>
		</a>
		<div />
		<section v-if="currentStep >= 1" id="s1">
			<div class="ellipsis">
				<div>This page is now linked to {{ wallet.url }} and using the selected address :</div>
				{{ wallet.address }}
			</div>
			<div>
				<div style="display: flex; align-items: center;">
					<span>Address :</span>
					<div style="display: inline-block; width: 0.5em;" />
					<input v-model="transactionData.target" style="flex: 1 1 0; text-align: right;" />
				</div>
				<div style="height: 0.5em;" />
				<div style="display: flex; align-items: center;">
					<span v-if="transactionData.target === 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE'">Donate? :</span>
					<span v-else>Send :</span>
					<div style="display: inline-block; width: 0.5em;" />
					<input v-model="arInput" style="flex: 1 1 0; text-align: right;" />
					<div style="display: inline-block; width: 0.5em;" />
					<span>AR<span v-if="arInputConversion" style="font-size: 0.75em; opacity: 0.8"> ({{ arInputConversion }})</span></span>
				</div>
				<div style="height: 0.5em;" />
				<div style="display: flex; align-items: center;">
					<span>Data :</span>
					<div style="display: inline-block; width: 0.5em;" />
					<input v-model="message" style="flex: 1 1 0; text-align: right;" />
				</div>
			</div>
			<div class="row">
				<button class="button" v-if="wallet.address" @click="signTransaction">
					<Rule />
					<span>Sign Transaction</span>
				</button>
				<button class="button" v-if="wallet.address" @click="dispatchData">
					<Rule />
					<span>Dispatch Data</span>
				</button>
			</div>
			<CodeBox :code="code[1]" />
			<div />
		</section>
		<section v-if="currentStep >= 2" id="s2">
			<template v-if="txUpload.signResult || txUpload.dispatchResult">
				<template v-if="txUpload.signResult">
					<div>Why choose signTransaction?</div>
					<div>After the signature is applied by the user, you have full control on the way that the transaction is submitted to the arweave network</div>
					<div>For example: when interacting with a smart contract, instead of using dispatch (which would handle everything automatically), use this method to make sure that your interactions are not submitted to a bundler service or, force them to use your own that's compatible with the runtime</div>
				</template>
				<template v-if="txUpload.dispatchResult">
					<div>Why choose dispatch for data?</div>
					<div v-if="parseFloat(arInput) > 0">You can transfer AR tokens using the dispatch method. However, the transfer amount was automatically set to 0 in this example so that the wallet provider can use the preferred bundler service by default. Normally, when transferring AR tokens, the provider will likely choose to use base transactions instead of bundled ones by default</div>
					<div v-else>The wallet provider can select the preferred bundler service. When transferring AR tokens, the provider will likely choose to use base transactions instead of bundled ones by default</div>
					<div>Free storage for users 🤯 (potentially)</div>
					<div>Data only transactions going through the bundling service are currently subsidized (up to a specific size limit), this allows for accounts with no funds to also be able to commit permanent data</div>
				</template>
				<div v-if="txUpload.signResult" class="row">
					<button class="button" @click="postTransaction">
						<Upload />
						<span v-if="!txUpload.upload">Upload Transaction</span>
						<span v-else>Uploaded ({{ txUpload.upload }})</span>
					</button>
				</div>
				<CodeBox :code="code[2]" />
			</template>
			<div v-if="txUpload.error">
				<CodeBox :code="`// Received error message\n${JSON.stringify(txUpload.error)}`" />
			</div>
			<div class="row">
				<button class="button" @click="() => currentStep = 3">
					<Rule />
					<span>Try out other methods</span>
				</button>
			</div>
			<div />
		</section>
		<section v-if="currentStep >= 3" id="s3">
			<div class="row">
				<button class="button" @click="runEncryption">
					<Rule />
					<span>{{ isEncrypted ? 'Decrypt' : 'Encrypt' }}</span>
				</button>
			</div>
			<CodeBox :code="code[3]" />
			<div class="row">
				<button class="button" @click="getArweaveConfig">
					<Rule />
					<span>Get Arweave Config</span>
				</button>
			</div>
			<CodeBox :code="otherMethodResult || 'Result'" />
		</section>
	</div>
</template>



<script setup lang="ts">
import ArweaveOutlineLogo from './components/icons/ArweaveOutlineLogo.vue'
import WalletSelector from './components/WalletSelector.vue'
import CodeBox from './components/CodeBox.vue'
import Github from './components/icons/Github.vue'
import Rule from './components/icons/Rule.vue'
import Upload from './components/icons/Upload.vue'
import Arweave from 'arweave'
import { reactive, ref, computed, watch } from 'vue'
import type Transaction from 'arweave/web/lib/transaction'
import type { DispatchResult } from '../../src/Arweave'
import { track } from './Analytics'

// Here, we import an instance of a wrapper class made for the Vue
// reactivity engine instead of importing the connector directly
import { wallet } from './ReactiveWallet'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
wallet.on('connect', () => currentStep.value = 1)
wallet.on('disconnect', () => currentStep.value = 0)



const arInput = ref('0.1')
const arInputConversion = computed(() => arToUsd(arInput.value))
// using the price of 500MB as default transaction amount
arweave.transactions.getPrice(1024*1024*512).then(price => arInput.value = displayNum(arweave.ar.winstonToAr(price)))
watch(arInput, value => transactionData.quantity = arweave.ar.arToWinston(value))
const message = ref('hello world')
watch(message, value => transactionData.data = value)
const transactionData = reactive({
	target: 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE',
	quantity: arweave.ar.arToWinston(arInput.value),
	data: message.value,
})

const getTxUpload = () => ({
	signResult: null as null | Transaction,
	dispatchResult: null as null | DispatchResult,
	error: null as any,
	upload: null as null | number
})
const txUpload = ref(getTxUpload())
const resetTxUpload = () => txUpload.value = getTxUpload()

const signTransaction = async () => {
	resetTxUpload()
	currentStep.value = 1
	try {
		const transaction = await arweave.createTransaction({ ...transactionData })
		transaction.addTag('App-Name', +transactionData.quantity > 0 && transactionData.target === 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE' ? 'Dev donation' : 'Trying out the connector')
		transaction.addTag('Tag-1', 'transaction tags are all displayed here')
		transaction.addTag('Tag-2', 'this is a real transaction')
		transaction.addTag('Tag-3', 'you can sign it here and not send it on the next page')
		await wallet.signTransaction(transaction)
		txUpload.value.signResult = transaction
		currentStep.value = 2
	} catch (e) {
		console.error(e)
		txUpload.value.error = e
		currentStep.value = 2
	}
}

const dispatchData = async () => {
	resetTxUpload()
	currentStep.value = 1
	try {
		const { quantity, ...data } = transactionData
		const transaction = await arweave.createTransaction({ ...data })
		transaction.addTag('App-Name', 'Trying out the connector')
		transaction.addTag('Tag-1', 'transaction tags are all displayed here')
		transaction.addTag('Tag-2', 'this is a real transaction')
		transaction.addTag('Tag-3', 'click accept and the wallet will do its best to')
		transaction.addTag('Tag-3.5', 'include it into the arweave network')
		const result = await wallet.dispatch(transaction)
		txUpload.value.dispatchResult = result
		currentStep.value = 2
	} catch (e) {
		console.error(e)
		txUpload.value.error = e
		currentStep.value = 2
	}
}



const postTransaction = async () => {
	if (!txUpload.value.signResult) { return }
	const uploader = await arweave.transactions.getUploader(txUpload.value.signResult)
	while (!uploader.isComplete) {
		try { await uploader.uploadChunk() } catch (e) { console.error(e) }
	}
	txUpload.value.upload = uploader.lastResponseStatus
}



const isEncrypted = ref(false)
const encryptionMessage = ref('You also have access to decryption and signing functions for arbitrary data')
let encryptionBuffer = arweave.utils.stringToBuffer(encryptionMessage.value)
const runEncryption = async () => {
	const options = { name: 'RSA-OAEP' }
	if (isEncrypted.value) {
		encryptionBuffer = await wallet.decrypt(new Uint8Array(encryptionBuffer!), options)
		encryptionMessage.value = decode(encryptionBuffer)
		isEncrypted.value = false
	} else {
		const publicJWK = { kty: "RSA", e: "AQAB", n: await wallet.getPublicKey(), alg: "RSA-OAEP-256", ext: true }
		const importedKey = await window.crypto.subtle.importKey('jwk', publicJWK, {...options, hash: 'SHA-256' }, false, ['encrypt'])
		encryptionBuffer = await window.crypto.subtle.encrypt(options, importedKey, encryptionBuffer)
		encryptionMessage.value = arweave.utils.bufferTob64(encryptionBuffer)
		isEncrypted.value = true
	}
}



const otherMethodResult = ref(null as null | string)
const getArweaveConfig = () => wallet.getArweaveConfig().then(res => otherMethodResult.value = JSON.stringify(res))





const inputUrl = ref('')
const currentStep = ref(0)
watch(currentStep, async val => {
	while (document.hidden) { await new Promise<void>(r => setTimeout(() => r(), 100)) }
	setTimeout(() => {
		document.querySelector('#s' + val)?.scrollIntoView({ behavior: 'smooth' })
	}, 300)
})

const displayNum = (num: string | number) => {
	typeof num === 'string' && (num = parseFloat(num))
	const FractionDigits = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(num)
	const SignificantDigits = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 1 }).format(num)
	return FractionDigits.length >= SignificantDigits.length ? FractionDigits : SignificantDigits as any
}

const arToUsd = (ar: string | number) => {
	if (!ar) { return }
	typeof ar === 'string' && (ar = parseFloat(ar))
	if (!conversionRate.value) { return }
	const result = ar * parseFloat(conversionRate.value)
	return Intl.NumberFormat([...navigator.languages], { style: 'currency', currency: 'USD'}).format(result)
}

const displayWinston = (winston: string) => {
	const ar = parseFloat(arweave.ar.winstonToAr(winston))
	const displayAR = displayNum(ar)
	const numUSD = arToUsd(ar)
	const displayUSD = numUSD ? ` (${numUSD})` : ''
	return displayAR + ' AR' + displayUSD
}

const conversionRate = ref(undefined as undefined | string)
fetch('https://api.redstone.finance/prices/?symbols=AR&provider=redstone').then(res => res.json().then(json => conversionRate.value = json.AR.value))

const commentProps = (e: any) => {
	if (e[0] == 'quantity' || e[0] == 'reward') { return ` // ${displayWinston(e[1])}` }
	if (e[0] == 'type') { return ` // 'BUNDLED' | 'BASE'` }
	return ''
}
const txToString = (obj: any) => obj && Object.entries(obj).reduce((acc, e) => acc
	+ `	${e[0]}: ${typeof e[1] === 'object' ? JSON.stringify(e[1]) : `'` + e[1] + `'`}${commentProps(e)}\n`, '')

function encode (text: string) {
	const encoder = new TextEncoder()
	return encoder.encode(text)
}

function decode (buffer: BufferSource) {
	const decoder = new TextDecoder()
	return decoder.decode(buffer)
}

const code = computed(() => [
`import { ArweaveWebWallet } from 'arweave-wallet-connector'

const wallet = new ArweaveWebWallet({ // Initialize the wallet as soon as possible to get instant auto reconnect
	name: 'Connector Example',
	logo: '${location.href}placeholder.svg'
})

wallet.setUrl('${inputUrl.value || wallet.url}')
await wallet.connect() // on user gesture to avoid blocked popup
`,



`const transaction = await arweave.createTransaction({
${txToString(transactionData)}})

// sign the transaction and upload it yourself
await wallet.signTransaction(transaction)

// or let the wallet handle the whole process of committing the
// transaction and uploading its data into the arweave network for you
const dispatchResult = await wallet.dispatch(transaction)
`,



`${ txUpload.value.dispatchResult ? 'dispatchResult is ' : 'transaction is ' }{
${txToString(txUpload.value.signResult || txUpload.value.dispatchResult)}}
`,



`let message = '${encryptionMessage.value}'
anyRsaEncryptFunction(message, await wallet.getPublicKey())
await wallet.decrypt(message, { name: 'RSA-OAEP' })
`,

])



let maxStep = 0
watch(currentStep, value => {
	if (value <= maxStep) { return }
	maxStep = value
	track.event(`Step ${value}`)
})
</script>



<style scoped>
.app {
	--app-spacing: 48px;
	--spacing: 2em;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--app-spacing);
	padding-bottom: 0;
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

section {
	min-height: 100vh;
	width: 100%;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

section > *:first-child {
	margin-top: calc(var(--app-spacing) * 2 + 5em);
}

section > * + * {
	margin-block-start: var(--app-spacing);
}

.row {
	display: flex;
	justify-content: center;
}

.row > * + * {
	margin-inline-start: var(--app-spacing);
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

input {
	color: inherit;
	background: transparent;
	padding: 0.5em;
	margin: 0;
	border: 0;
	outline: 0;
	border-bottom: 1px solid #ffffff22;
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

.button {
	font-size: 0.8em;
	color: #ccc;
	text-decoration: none;
	padding: 1em 1.5em 1em 1em;
	background: #202020;
	border-radius: 1.6em;
	display: flex;
	align-items: center;
	box-shadow: 5px 5px 20px #070707, -5px -5px 20px #1b1b1b;
	transition: 1s ease;
	justify-content: center;
}

.button:hover {
	background: #282828;
}

.button:active {
	background: #111;
	transition: 0s ease;
}

.button > * + * {
	margin-inline-start: 1.5em;
}
</style>



<style>
html {
	background: #111;
	box-sizing: border-box;
	line-height: 2;
	scroll-snap-type: y mandatory;
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