<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<WalletSelector />

	</div>
</template>



<script lang="ts">
import WalletSelector from "./components/WalletSelector.vue";
import ArweaveOutlineLogo from "./components/ArweaveOutlineLogo.vue";
import { defineComponent } from "vue";

import { WebWallet } from "arweave-wallet-connector";

export default defineComponent({
	name: "App",
	components: { WalletSelector, ArweaveOutlineLogo },
	setup() {

		const connect = (url: string) => {
			const wallet = new WebWallet(url || "arweave.app");
			wallet.connect();
		};
		return { connect };
	},
});
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
</style>



<style>
html {
	background: #111;
}

body {
	margin: 0;
	padding: 0;
}

button {
	color: inherit;
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	font-size: 1em;
	cursor: pointer;
}

input {
	color: inherit;
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	font-size: 1em;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ddd;
}
</style>