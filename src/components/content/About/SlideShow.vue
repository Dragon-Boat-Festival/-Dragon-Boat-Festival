<template>
	<div id='banner'>
		<div class='banner-card'>
			<h1>端午节</h1>
			<el-button type="success">6月14日</el-button>
			<el-divider></el-divider>
			<p>{{ message }}</p>
		</div>
		<div class="SlideShow">
			<!--element-ui 走马灯-->
			<el-carousel :height="elHeight" :type=type arrow='always'>
				<el-carousel-item v-for="(item, index) in list_img" :key="index">
					<h3 class="small">
						<img :src="item.url" alt />
					</h3>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>
<script>
export default {
	name: "SlideShow",
	data() {
		return {
			list_img: [
				{url: require('@/assets/images/SlideShow/1.webp')},
				{url: require('@/assets/images/SlideShow/2.webp')},
				{url: require('@/assets/images/SlideShow/3.webp')}
			],
			message: '端午节，是集祈福辟邪、欢庆娱乐和饮食为一体的民俗大节，由来于上古先民择“飞龙在天”吉日拜祭龙祖、祈福纳祥、辟邪攘灾。',
			elHeight: '460px',
			type: ""
		}
	},
	mounted() {
		if (window.document.body.clientWidth < 768) {
			this.elHeight = '230px'
			this.type = "card"
		}
		const _this = this
		window.onresize = () => {
			if (window.document.body.clientWidth < 768) {
				return (() => {
					_this.elHeight = '230px'
					_this.type = "card"
				})()
			} else if (window.document.body.clientWidth > 768) {
				return (() => {
					_this.elHeight = '460px'
					_this.type = ""
				})()
			}
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	#banner {
		flex-direction: column;
	}

	.banner-card h1 {
		margin: 30px auto !important;
	}

	.el-button--success {
		top: 85px !important;
	}

	.el-carousel__container {
		height: 230px !important;
	}

	.banner-card p {
		line-height: 26px !important;
		font-size: 18px !important;
	}

	.SlideShow {
		margin: 0;
	}

	.banner-card h1 {
		font-size: 30px !important;
	}
}

#banner {
	display: flex;
	margin: 10px;
	overflow: hidden;
}

.banner-card {
	position: relative;
	flex: 4;
	background-color: #fff;
	border-radius: 4px;
	margin: 10px;
}

.banner-card h1 {
	display: block;
	text-align: center;
	margin: 60px auto;
	font-size: 38px;
	font-weight: 200;
}

.el-button--success {
	position: absolute;
	top: 145px;
	left: 0;
	right: 0;
	margin: 0 auto;
	z-index: 2;
}

.el-divider--horizontal {
	box-shadow: 0 -4px 8px rgba(0, 0, 0, .40);
}

.banner-card p {
	display: inline-block;
	margin: 30px;
	line-height: 36px;
	font-size: 22px;
}

.SlideShow {
	margin: 10px auto;
	width: 100%;
	height: 100%;
	flex: 6;
}

.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 1;
	line-height: 300px;
	margin: 0;
	text-align: center;
}

.el-carousel__item:nth-child(2n) {
	background-color: var(--color-background);
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: var(--color-background);
}

.small img {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	object-fit: cover;
}
</style>