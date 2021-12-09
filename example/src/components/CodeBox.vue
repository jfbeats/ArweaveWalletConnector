<template>
	<div class="code-box">
	<highlightjs class="box" :code="code" />
	</div>
</template>



<script setup lang="ts">
const props = defineProps(['code'])
</script>



<style scoped>
.code-box {
	margin-block-start: 2em !important;
	width: 100%;
	max-width: 800px;
}

.box {
	margin: 0;
	width: 100%;
	text-align: left;
}

.box :deep(code) {
	/* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	font-size: 0.9em; */
	padding: 2em;
	border-radius: 8px;
	overflow: hidden;
	overflow-x: auto;
	scrollbar-width: none;
}

.box :deep(code::-webkit-scrollbar) {
	display: none;
}
</style>