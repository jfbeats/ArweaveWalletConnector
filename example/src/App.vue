<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<!-- link to: baseSourceUrl + /example/ + path -->
		<WalletSelector v-model="inputUrl" class="wallet-selector" />
		<CodeBox :code="code[0]" />
		<div>The connector module itself has no visual element included. This page is an example on how it can be integrated</div>
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
					<span>Optionally donate :</span>
					<div style="display: inline-block; width: 0.5em;" />
					<input v-model="arInput" style="width: 4em; text-align: center;" />
					<div style="display: inline-block; width: 0.5em;" />
					<span>AR</span>
				</div>
				<div style="height: 0.5em;" />
				<div style="display: flex; align-items: center;">
					<span>Message :</span>
					<div style="display: inline-block; width: 0.5em;" />
					<input v-model="message" style="flex: 1 1 0;" />
				</div>
			</div>
			<div class="row">
				<button class="button" v-if="wallet.address" @click="signTransaction">
					<Rule />
					<span>Sign Transaction</span>
				</button>
			</div>
			<CodeBox :code="code[1]" />
			<div />
		</section>
		<section v-if="currentStep >= 2" id="s2">
			<template v-if="transactionObject">
				<div class="row">
					<button class="button" @click="postTransaction">
						<Upload />
						<span>Upload Transaction</span>
					</button>
				</div>
				<CodeBox :code="code[2]" />
			</template>
			<div v-if="transactionError">
				<CodeBox :code="`// Received error message\n${JSON.stringify(transactionError)}`" />
			</div>
			<div class="row">
				<button class="button" @click="() => goTo(3)">
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

// Here, we import an instance of a wrapper class made for the Vue
// reactivity engine instead of importing the connector directly
import { wallet } from './ReactiveWallet'
import Transaction from 'arweave/web/lib/transaction'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
wallet.on('connect', () => currentStep.value = 1)
wallet.on('disconnect', () => currentStep.value = 0)



const arInput = ref('0.1')
watch(arInput, (value) => transactionData.quantity = arweave.ar.arToWinston(value))
const message = ref('hello world')
watch(message, (value) => transactionData.data = value)
const transactionData = reactive({
	target: 'TId0Wix2KFl1gArtAT6Do1CbWU_0wneGvS5X9BfW5PE',
	quantity: arweave.ar.arToWinston(arInput.value),
	data: message.value,
})

const transactionObject = ref(null as null | Transaction)
const transactionError = ref(null as any)

const signTransaction = async () => {
	transactionObject.value = null
	transactionError.value = null
	currentStep.value = 1
	try {
		const transaction = await arweave.createTransaction({ ...transactionData })
		transaction.addTag('App-Name', +transactionData.quantity > 0 ? 'Donating to the dev' : 'Trying out the connector')
		transaction.addTag('Tag-1', 'transaction tags are all displayed here')
		transaction.addTag('Tag-2', 'this is a real transaction')
		transaction.addTag('Tag-3', 'you can sign it here and not send it on the next page')
		await wallet.signTransaction(transaction)
		console.log(transaction)
		transactionObject.value = transaction
		currentStep.value = 2
	} catch (e) {
		console.error(e)
		wallet.error = e as string
		transactionError.value = e
		currentStep.value = 2
	}
}



const postTransaction = async () => {
	alert('waiting for arweave-js fix 😁')
	// if (!transactionObject.value) { return }
	// const uploader = await arweave.transactions.getUploader(transactionObject.value)
	// while (!uploader.isComplete) {
	// 	await uploader.uploadChunk()
	// }
}



const isEncrypted = ref(false)
const encryptionMessage = ref('You also have access to decryption and signing functions for arbitrary data')
const runEncryption = async () => {
	const options = { name: 'RSA-OAEP' }
	if (isEncrypted.value) {
		encryptionMessage.value = await wallet.decrypt(encryptionMessage.value, options)
		isEncrypted.value = false
	} else {
		const publicJWK = { kty: "RSA", e: "AQAB", n: await wallet.getPublicKey(), alg: "RSA-OAEP-256", ext: true }
		const importedKey = await window.crypto.subtle.importKey('jwk', publicJWK, {...options, hash: 'SHA-256' }, false, ['encrypt'])
		const encrypted = await window.crypto.subtle.encrypt(options, importedKey, encode(encryptionMessage.value)) as ArrayBuffer
		encryptionMessage.value = arweave.utils.bufferTob64Url(new Uint8Array(encrypted))
		isEncrypted.value = true
	}
}








// const location = window.location
const inputUrl = ref(wallet.url)
const currentStep = ref(0)
watch(currentStep, async val => {
	while (document.hidden) { await new Promise<void>(r => setTimeout(() => r(), 100)) }
	setTimeout(() => goTo(val), 300)
})
const goTo = async (num: number) => {
	currentStep.value = num
	document.querySelector('#s' + num)?.scrollIntoView({ behavior: 'smooth' })
}

const displayNum = (num: any) => {
	const FractionDigits = new Intl.NumberFormat(navigator.languages as any, { maximumFractionDigits: 3 }).format(num)
	const SignificantDigits = new Intl.NumberFormat(navigator.languages as any, { maximumSignificantDigits: 1 }).format(num)
	return FractionDigits.length >= SignificantDigits.length ? FractionDigits : SignificantDigits
}

const txToString = (obj: any) => obj && Object.entries(obj).reduce((acc, e) => acc + `	${e[0]}: '${typeof e[1] === 'object' ? JSON.stringify(e[1]) : e[1]}'${e[0] == 'quantity' ? ` // ${displayNum(arweave.ar.winstonToAr(e[1] as string))} AR` : ''}\n`, '')

function encode (text: string) {
	const encoder = new TextEncoder()
	return encoder.encode(text)
}

function decode (buffer: BufferSource) {
	const decoder = new TextDecoder()
	return decoder.decode(buffer)
}

const code = computed(() => [
`// npm install arweave-wallet-connector
import { ArweaveWebWallet } from 'arweave-wallet-connector'
const wallet = new ArweaveWebWallet({
	name: 'Connector Example',
	logo: '${location.href}placeholder.svg'
})

wallet.setUrl('${inputUrl.value}')`,



`const transaction = await arweave.createTransaction({
${txToString(transactionData)}})
await wallet.signTransaction(transaction)`,



`// Uploading data to the wallet directly is not yet available
// using arweave.js in the meantime
{
${txToString(transactionObject.value)}}`,



`let message = "${encryptionMessage.value}"
wallet.decrypt(message, { name: 'RSA-OAEP' })`,



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