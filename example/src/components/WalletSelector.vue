<template>
	<div class="url-input">
		<input class="url" v-model="url" :placeholder="defaultURL" @keydown.enter="submit">
		<button class="action" @click="submit">Connect</button>
	</div>
</template>



<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup(props, { emit }) {
		const defaultURL = "arweave.app";
		const url = ref(defaultURL);
		const submit = () => emit("submit", url.value || "arweave.app");
		return { defaultURL, url, submit };
	},
});
</script>



<style scoped>
.url-input {
	background: #ffffff05;
	border: 0.5px solid #ffffff20;
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
	outline: none;
}

.action {
	padding: 2em;
	cursor: pointer;
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
</style>
