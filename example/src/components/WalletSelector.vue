<template>
	<div class="url-input">
		<input class="url" v-model="model" :placeholder="wallet.url" @keydown.enter="connect" />
		<div class="actions">
			<transition name="fade">
				<Button v-if="wallet.address" class="action" :icon="popupIcon" @click="togglePopup" :class="{ dim: !wallet.keepPopup }" />
			</transition>
			<Button class="action" :icon="connectionIcon" @click="wallet.address ? disconnect() : connect()" :class="{ dim: data.loading }" />
		</div>
	</div>
</template>



<script setup lang="ts">
import { wallet } from '../ReactiveWallet'
import { reactive, computed } from "vue";
import Button from './WalletSelectorIcons.vue';

const props = defineProps(['modelValue', 'icon', 'placeholder', 'actions', 'autocomplete', 'mask', 'disabled', 'id'])
const emit = defineEmits(['update:modelValue'])
const model = computed<string>({
	get () { return props.modelValue },
	set (value) { emit('update:modelValue', value) }
})
const data = reactive({
	loading: false,
})
const connect = () => {
	wallet.setUrl(model.value || wallet.url!)
	wallet.connect()
	data.loading = true
	wallet.once('change', () => data.loading = false)
}
const disconnect = () => wallet.disconnect()
const togglePopup = () => wallet.keepPopup = !wallet.keepPopup
const popupIcon = computed(() => wallet.keepPopup ? 'close' : 'launch')
const connectionIcon = computed(() => wallet.address ? 'unplug' : 'plug')
</script>



<style scoped>
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
