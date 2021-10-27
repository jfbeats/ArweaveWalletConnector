<template>
	<div class="url-input">
		<input class="url" v-model="data.url" :placeholder="walletData.url" @keydown.enter="connect" />
		<div class="actions">
			<transition name="fade">
				<Button v-if="walletData.address" class="action" :icon="popupIcon" @click="togglePopup" :class="{ dim: !walletData.keepPopup }" />
			</transition>
			<Button class="action" :icon="connectionIcon" @click="walletData.address ? disconnect() : connect()" :class="{ dim: data.loading }" />
		</div>
	</div>
</template>



<script lang="ts">
import { wallet, walletData } from '../ReactiveWallet'
import { defineComponent, reactive, computed } from "vue";

import Button from './Button.vue';

export default defineComponent({
	components: { Button },
	setup() {
		const data = reactive({
			url: walletData.url,
			loading: false,
		})
		const connect = () => {
			wallet.setUrl(data.url || walletData.url)
			wallet.connect()
			data.loading = true
			wallet.once('change', () => data.loading = false)
		}
		const disconnect = () => wallet.disconnect()
		const togglePopup = () => wallet.keepPopup = !wallet.keepPopup
		const popupIcon = computed(() => walletData.keepPopup ? 'close' : 'launch')
		const connectionIcon = computed(() => walletData.address ? 'unplug' : 'plug')
		return { data, walletData, connect, disconnect, togglePopup, connectionIcon, popupIcon }
	},
})
</script>



<style scoped>
.url-input {
	background: #ffffff05;
	border: 0.5px solid #ffffff20;
	display: flex;
	align-items: stretch;
	border-radius: 16px;
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
