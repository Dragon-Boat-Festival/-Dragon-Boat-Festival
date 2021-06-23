<template>
	<div class="detail">
		<div class="container">
			<div class="detail-wrapper">
				<Header :goodData="goodData" />
				<DetailContent :goodData="goodData" />
				<div :append-to-body='true' class="gotop" @click="toNav">
					<svg aria-hidden="true" class="icon">
						<use
							:xlink:href="iconArr[Math.floor(Math.random() * iconArr.length)]"
						></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/**
 * 商品详情页
 **/
import Header from "@/components/content/Detail/Header/Header"
import DetailContent from "@/components/content/Detail/detailContent/DetailContent"
import DetailData from "@/tools/Category.json"

export default {
	name: "Detail",
	props: {
		id: {
			type: Number,
			default: 1
		}
	},
	components: {
		Header,
		DetailContent
	},

	mounted() {
		const res = DetailData.data.find(
			(item, index) => item.id === parseInt(this.id)
		)
		this.goodData = res
	},

	data() {
		return {
			goodData: {},
			iconArr: [
				"#icon-zongziMBE",
				"#icon-zongzi",
				"#icon-rouzongzibaobao",
				"#icon-zongzibaobao",
				"#icon-zongzi1"
			]
		}
	},
	methods: {
		toNav() {
			document.getElementById("detail-header").scrollIntoView({behavior: "smooth"})
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.detail {
		padding-top: 10px !important;
	}

	.gotop {
		padding: 0 !important;
		right: 20px !important;
	}

	.gotop:active {
		background-color: var(--color-text);
		color: #fff;
	}
}

.detail {
	width: 100%;
	height: auto;
	padding-top: 60px;
	padding-bottom: 20px;
	background: #fff;
	overflow: hidden;
	border-top: 1px solid #e7e7e7;
}

.container {
	margin: 0 auto;
}

.container > * {
	box-sizing: content-box;
	min-height: inherit;
	position: relative;
}

.gotop {
	text-align: center;
	position: fixed;
	right: 80px;
	bottom: 80px;
	cursor: pointer;
	padding: 10px;
	color: var(--color-text);
	transition: all 0.3s;
	z-index: 3;
}

.icon {
	width: 60px;
	height: 60px;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>