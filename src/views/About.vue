<template>
	<div id='about'>
		<slide-show></slide-show>
		<Content></Content>
		<Introduce></Introduce>
	</div>
</template>
<script>
import SlideShow from "@/components/content/About/SlideShow"
import Content from "@/components/content/About/Content"

import Introduce from "@/components/content/About/Introduce"



export default {
	name: 'About',
	components: {
		SlideShow,
		Content,

		Introduce,
	}
}
</script>
<style scoped>
</style>