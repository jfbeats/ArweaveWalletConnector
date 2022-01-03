<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import WalletSelector from '$lib/components/WalletSelector.svelte';
	let mounted;
	onMount(() => {
		mounted = true;
	});
</script>

<div class="app" id="app">
	<h1>Welcome to SvelteKit - Arweave Wallet Connector</h1>
	{#if mounted}
		<div class="wallet-selector">
			<WalletSelector />
		</div>
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
		width: 100%;
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
