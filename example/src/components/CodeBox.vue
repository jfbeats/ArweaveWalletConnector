<template>
	<highlightjs class="box" code="console.log('Hello World');" />
</template>



<script setup lang="ts">
</script>



<style scoped>
.box {
	margin-block-start: 2em !important;
	margin: 0;
	width: 100%;
	max-width: 800px;
	text-align: left;
}

.box >>> code {
	/* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
	font-size: 0.9em; */
	padding: 2em;
	border-radius: 8px;
	overflow: hidden;
}
</style>