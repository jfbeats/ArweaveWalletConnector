<script lang="ts">
	// svelte stuff
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { draggable } from 'svelte-drag';

	// wallet imports
	import { ArweaveWebWallet } from 'arweave-wallet-connector';
	import IconButton from './components/WalletSelectorIcons.svelte';

	export let inputUrl = 'http://localhost:8080/';

	let wallet;
	let focused;
	let iframeParentNode: Node;

	onMount(() => {
		wallet = new ArweaveWebWallet({
			iframeParentNode,
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

	function handleKeydown(event) {
		if (event.key === 'Enter' && focused) connect();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="url-input" use:draggable>
	<input
		class="url"
		{placeholder}
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
		bind:value={inputUrl}
		style={`--input-width: ${Array.from(inputUrl).length}em;`}
	/>
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

<div bind:this={iframeParentNode}>
	<!-- iframe popups go here -->
</div>

<style>
	.url-input {
		position: fixed;
		top: var(--spacing);
		right: var(--spacing);
		background: #161616;
		border: 0.5px solid #333;
		display: flex;
		align-items: stretch;
		border-radius: 8px;
		width: auto;
		min-width: 20em;
		max-width: 800px;
		--spacing: 1em;
		padding: var(--spacing);
		filter: drop-shadow(2px 4px 6px rgba(133, 133, 133, 0.5));
	}
	.url-input:hover {
		cursor: move;
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
		color: whitesmoke;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font-size: 1em;
		width: var(--input-width);
		min-width: 40ch;
	}
</style>
