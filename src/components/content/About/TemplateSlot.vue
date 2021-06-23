<template>
	<div id='content'>
		
		<el-card class='box-card content-text'>
      <slot name="leftContainer"></slot>
		</el-card>
		<div class='content-know'>
			<el-card class='box-card ptop10'>
        <slot name="rightContainer"></slot>
			</el-card>
		</div>
	</div>
</template>
<script>
export default {
	name: "Content",
	data() {
		return {
			tableData: [{
				key: '中文名',
				value: '端午节'
			}, {
				key: '外文名',
				value: 'Dragon Boat Festival'
			}, {
				key: '别名',
				value: '端阳节、龙节、正阳节、龙舟节、天中节等'
			}, {
				key: '节日时间',
				value: '农历五月初五'
			}],
			activeNames: ['1']
		}
	},
	methods: {
		// 修改table header的背景色
		tableHeaderColor({rowIndex}) {
			if (rowIndex === 0) {
				return 'color: var(--color-text); font-size:18.5px;padding-bottom: 23px;'
			}
		}
	}
}
</script>
<style scoped>
@import '~@/components/content/About/index.css';

</style>