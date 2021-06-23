<template>
	<div id='navbar'>
		<el-menu :default-active="activeIndex" active-text-color='#5BB35C' class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="/">关于端午</el-menu-item>
			<el-menu-item index="/category">粽子分类</el-menu-item>
			<el-menu-item index="/hold">龙舟举办</el-menu-item>
			<el-menu-item index="/news">端午新闻</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
	name: "NavBar",
	
	methods: {
		handleSelect(key, keyPath) {
			// console.log(key, keyPath)
			this.setActiveIndex({key})
			this.$router.replace({path: key})
		},
		...mapActions(['setActiveIndex'])
	},
	computed: {
		...mapState([
			'activeIndex'
		])
	},
  watch: {
		$route(){
				this.setActiveIndex({key: this.$route.path})
		}
	}

}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.el-menu-item {
		font-size: 14px !important;
	}

	#navbar {
		background: #fff;
		height: auto;
		overflow-y: auto;
	}

	#navbar::-webkit-scrollbar-thumb {
		background: #fff;
		border-radius: 10px;
	}
}

.el-menu {
	display: -webkit-flex; /* Safari */
	display: flex;
}

.el-menu-item {
	flex: 1;
	text-align: center;
	font-size: 16px;
}
</style>