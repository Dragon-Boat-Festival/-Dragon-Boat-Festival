<template>
	<el-row
		:gutter="10"
		justify="flex-start"
		style="flex-wrap: wrap; padding-left: 20px;"
		type="flex"
	>
		<el-col
			v-for="(zongzi, index) in this.zongzis"
			:key="index"
			:span=span
			style=" padding: 10px;"
		>
			<el-card :body-style="{ padding: '0', margin: '10px, 10px' }">
				<img :src="zongzi.img_url" class="image" />
				<div class="zongzi-info">
					<h4>{{ zongzi.name }}</h4>
					<div class="bottom clearfix">
						<time class="eName">{{ zongzi.eName }}</time>
					</div>
					<div class="bottom clearfix">
						<span class="effect">{{ zongzi.effect }}</span>
					</div>
					<div class="bottom clearfix">
						<div class="desc">{{ zongzi.desc }}</div>
					</div>
					<div class="bootom clearfix">
						<el-button class="button" style="padding-left: 10px" type="text" @click="isShowDetail(zongzi.id, zongzi.name)"
						>购买粽子
						</el-button
						>
						<el-button class="button" type="text" @click="() => {isShowDrawer(zongzi.name)}">粽子做法</el-button>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>
<script>
export default {

	name: "CategoryCard",
	props: {
		zongzis: {
			type: Array,
			default: {}
		},
		isShowDrawer: {
			type: Function
		},
		isShowDetail: {
			type: Function
		}
	},
	mounted() {
		if (window.document.body.clientWidth < 768) {
			this.span = 20
		}
		const _this = this
		window.addEventListener('resize', () => {
			if (window.document.body.clientWidth < 768) {
				return (() => {
					_this.span = 20
				})()
			} else if (window.document.body.clientWidth > 768) {
				return (() => {
					_this.span = 8
				})()
			}
		})
	},

	data() {
		return {
			currentDate: new Date(),
			span: 8
		}

	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	/deep/ .el-col {
		margin: 0 20px 10px 22px !important;
	}
}

.eName {
	font-size: 13px;
	color: #999;
	padding-bottom: 10px;
}

.bottom {
	margin-top: 10px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	height: 250px;
	object-fit: cover;
	object-position: center;
	display: block;
}


.clearfix:before,
.clearfix:after {
	clear: both;
	display: table;
	content: "";
}


.clearfix:after {
	clear: both;
}

/* 粽子信息 */
.zongzi-info {
	height: 280px;
	padding: 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.zongzi-info h4 {
	color: var(--color-height-text);
}

.zongzi-info .desc {
	height: 108px;
	overflow: hidden;
	font-size: 16px;
	margin-bottom: 10px;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
	color: #000;
}
</style>