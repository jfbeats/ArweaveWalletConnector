<script lang="ts">
	// svelte stuff
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { dev } from '$app/env';

	// wallet imports
	import { ArweaveWebWallet } from 'arweave-wallet-connector';
	import IconButton from './WalletSelectorIcons.svelte';

	let inputUrl = dev ? 'http://localhost:8080' : 'https://arweave.app';
	let wallet;

	onMount(() => {
		wallet = new ArweaveWebWallet({
			name: 'Connector Example',
			logo: `${location?.href}placeholder.svg`
		});
	});

	let placeholder = 'Enter Wallet Url';

	const data = {
		loading: false
	};

	const connect = () => {
		wallet.setUrl(inputUrl);
		wallet.connect();
		data.loading = true;
		wallet.once('change', () => {
			data.loading = false;
			wallet = wallet; // trigger any svelte updates that relies on deeply nested wallet variables
		});
	};
	const disconnect = () => wallet.disconnect();
	const togglePopup = () => (wallet.keepPopup = !wallet.keepPopup);

	$: popupIcon = wallet?.keepPopup ? 'close' : 'launch';
	$: connectionIcon = wallet?.address ? 'unplug' : 'plug';
</script>

<div class="url-input">
	<input class="url" {placeholder} on:keydown={connect} bind:value={inputUrl} />
	<div class="actions">
		{#if wallet?.address}
			<div
				transition:fade={{ delay: 100, duration: 100 }}
				class={!wallet.keepPopup ? 'action dim' : 'action'}
			>
				<IconButton icon={popupIcon} on:click={togglePopup} />
			</div>
		{/if}

		<div
			class={data?.loading
				? 'action dim'
				: 'action' && wallet?.address
				? ' connected '
				: ' disconnected '}
		>
			<IconButton
				icon={connectionIcon}
				on:click={() => {
					wallet?.address ? disconnect() : connect();
				}}
				><span class={wallet?.address ? ' connected ' : ' disconnected '}
					>{wallet?.address ? 'Disconnect' : 'Connect'}</span
				></IconButton
			>
		</div>
	</div>
</div>

<style>
	.url-input {
		background: #161616;
		border: 0.5px solid #333;
		display: flex;
		align-items: stretch;
		border-radius: 8px;
		width: 100%;
		min-width: 0;
		max-width: 800px;
		--spacing: 2em;
	}

	.url {
		padding: var(--spacing);
		padding-right: 0;
		flex: 1 1 0;
		min-width: 0;
		outline: none;
	}

	.actions {
		display: flex;
	}

	.actions:last-child {
		padding-right: calc(var(--spacing) / 2);
	}

	.action.dim {
		opacity: 0.2;
		color: yellow;
	}

	.connected {
		color: greenyellow;
		text-shadow: 1px 1px 3px black;
	}

	.disconnected {
		color: #e0f7fa;
		text-shadow: 1px 1px 3px black;
	}

	input {
		flex: 1 1 0;
		color: inherit;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font-size: 1em;
	}
</style>
