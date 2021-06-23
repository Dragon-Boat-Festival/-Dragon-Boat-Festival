<template>
	<div class="step">
		<img :src="step.img_url" alt='' />
		<h3 class="stepName ptop">{{ step.steps }}</h3>
		<h1 class="title ptop">{{ step.title }}</h1>
		<p class="desc1 ptop">{{ step.desc1 }}</p>
		<p class="desc2 ptop">{{ step.desc2 }}</p>
	</div>
</template>
<script>
export default {
	name: "Step",
	props: {
		step: {
			type: Object,
			default: {}
		},
		stepName: {
			type: String,
			default: ''
		}
	}
}
</script>
<style>
@media screen and (max-width: 768px) {
	.step > img {
		width: 250px !important;
		height: 200px !important;
	}
}

.step {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 80px 40px;
}

.step > img {
	width: 60%;
	object-fit: cover;
	object-position: center;
}

.ptop {
	padding-top: 10px;
	color: #000;
}
</style>