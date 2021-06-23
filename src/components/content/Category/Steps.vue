<template>
	<div class="container">
		<div class="steps">
			<el-steps :active="active" :direction=direction finish-status="success">
				<el-step title="步骤一"></el-step>
				<el-step title="步骤二"></el-step>
				<el-step title="步骤三"></el-step>
			</el-steps>
		</div>
		<div class="content" @click='next'>
			<Step v-if="active === 1" :step="steps[0]" stepName="step1" />
			<Step v-if="active === 2" :step="steps[1]" />
			<Step v-if="active === 3" :step="steps[2]" />
		</div>
	</div>
</template>
<script>
import Step from "@/components/content/Category/Step"

export default {
	name: "Steps",

	components: {
		Step
	},

	data() {
		return {
			active: 1,
			steps: [
				{
					img_url: require("@/assets/images/step/step1.png"),
					steps: "步骤一",
					title: "洗糯米 & 分豆沙",
					desc1:
						"洗米，泡米，沥干备用 （米可以泡小时，也可以不泡，不泡的更有嚼头）",
					desc2: "豆沙分成小块备用，豆沙的量可以根据个人喜好，可大可小"
				}, {
					img_url: require("@/assets/images/step/step2.png"),
					steps: "步骤二",
					title: "焯水粽子叶 & 装糯米豆沙",
					desc1: "粽子叶冷冻后泡水备用，如果不冷冻就要焯水；",
					desc2: "将粽子叶头部一厘米处剪掉，三张并在一起。卷成桶形，放入糯米和豆沙"
				}, {
					img_url: require("@/assets/images/step/step3.png"),
					steps: "步骤三",
					title: "放高压锅 & 享受美味",
					desc1: "享受美味 包好后放高压锅，水只要没过粽子，20分钟左右即可",
					desc2: "享受你的美味吧！甜粽子万岁！"
				}
			],
			direction: "vertical"
		}
	},

	methods: {
		next() {
			if (this.active++ > 2) this.active = 1
		}
	},

	mounted() {
		if (window.document.body.clientWidth < 768) {
			this.direction = "horizontal"
		}
		const _this = this
		window.addEventListener('resize', () => {
			if (window.document.body.clientWidth < 768) {
				return (() => {
					_this.direction = "horizontal"
				})()
			} else if (window.document.body.clientWidth > 768) {
				return (() => {
					_this.direction = "vertical"
				})()
			}
		})
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.container {
		width: 100% !important;
		flex-direction: column;
	}

	.steps {
		margin: 0 auto !important;
		width: 70% !important;
	}
}

.container {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
}

.steps {
	width: 15%;
	height: 80%;
	margin-left: 80px;
}

.content {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>