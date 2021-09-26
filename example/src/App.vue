<template>
	<div class="app">
		<ArweaveOutlineLogo class="logo" />
		<WalletSelector @submit="connect" :loading="data.loading" />
		<div>{{ data.address }}</div>
	</div>
</template>



<script lang="ts">
import WalletSelector from "./components/WalletSelector.vue";
import ArweaveOutlineLogo from "./components/ArweaveOutlineLogo.vue";
import { defineComponent, reactive } from "vue";

// Import the wallet connector
import { WebWallet } from "arweave-wallet-connector";

export default defineComponent({
	name: "App",
	components: { WalletSelector, ArweaveOutlineLogo },
	setup() {
		const data = reactive({
			address: null as null | string,
			loading: false,
			error: "",
		});

		let wallet: WebWallet | null = null;

		// Initialize the wallet from user submitted URL or preselected options
		const connect = async (url: string) => {
			wallet = new WebWallet(url);
			wallet.on("connect", (address) => (data.address = address));
			wallet.on("disconnect", () => (data.address = null));
			data.loading = true;
			await wallet.connect();
			data.loading = false;
		};

		return { data, connect };
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

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ddd;
}
</style>