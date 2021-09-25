<template>
		<div class="url-input">
			<input class="url" v-model="url">
			<button class="action" @click="connect">Connect</button>
		</div>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const url = ref("arweave.app");
		return { url };
	},
});
</script>



<style scoped>
.url-input {
	background: #161616;
	border: 0.5px solid #333;
	display: flex;
	border-radius: 16px;
	width: 100%;
	min-width: none;
	max-width: 800px;
}

.url {
	padding: 2em;
	flex: 1 1 0;
	min-width: 0;
}

.action {
	padding: 2em;
	cursor: pointer;
}
</style>
