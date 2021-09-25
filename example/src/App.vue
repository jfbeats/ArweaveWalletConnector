<template>
	<div>
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
		const wallet = new WebWallet('arweave.app');
		console.log(wallet);
	},
});
</script>



<style>
body {
	background: #111;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ddd;
}
</style>



<style scoped>
.logo {
	height: 30vh;
	margin-top: 60px;
}
</style>