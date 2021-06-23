<template>
	<div id='news'>
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: "News-bg"
}
</script>
<style scoped>
#news {
	width: 100%;
	position: relative;
}

#news::before {
	content: '';
	display: block;
	width: 1px;
	height: 155%;
	position: absolute;
	background: var(--color-text);
	top: -50%;
	left: 50%;
	z-index: -1;
}
</style>