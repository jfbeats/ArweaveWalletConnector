<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import Wallet from '$lib/Wallet.svelte';
	let mounted;
	onMount(() => {
		mounted = true;
	});
</script>

<div class="app" id="app">
	<h1>Welcome to SvelteKit - Arweave Wallet Connector</h1>
	{#if mounted}
		<Wallet />
	{/if}
</div>

<style>
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
</style>
