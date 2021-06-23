<template>
	<div id='footer'>
		<div v-if="gotop" class="gotop" @click="toNav">
			<svg aria-hidden="true" class="icon">
				<use
					:xlink:href="iconArr[Math.floor(Math.random() * iconArr.length)]"
				></use>
			</svg>
		</div>
		<div class='text'>
			<span>版权所有©：2021 - 广东省高新技术高级技工学校</span>
			<p>-18计算机高技升读班-黄伟绩</p>
			<p>-18计算机高技升读班-张伟杰</p>
			<p>-18计算机高技升读班-阳怡侄</p>
		</div>
		<div class='message'>
			<p>网页制作比赛参赛作品</p>
		</div>
	</div>
</template>
<script>
import "@/assets/font/icon/iconfont.js"

export default {

	name: "Footer",
	data() {
		return {
			gotop: false,
			iconArr: [
				"#icon-zongziMBE",
				"#icon-zongzi",
				"#icon-rouzongzibaobao",
				"#icon-zongzibaobao",
				"#icon-zongzi1"
			]
		}
	},
	mounted() {
		// 此处true需要加上，不加滚动事件可能绑定不成功
		window.addEventListener("scroll", this.handleScroll, true)
		if (window.document.body.clientWidth < 768) {
			this.gotop = false
		}
	},
	methods: {
		handleScroll() {
			let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
			scrolltop > 800 ? (this.gotop = true) : (this.gotop = false)
		},
		toNav() {
			document.getElementById("screen").scrollIntoView({block: "start"})
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	#footer {
		flex-direction: column;
	}

	.text p {
		margin: 0 !important;
		text-align: center;
	}

	.message p {
		border-top: 2px solid #fff;
		margin: 10px !important;
		padding: 10px;
		text-align: center;
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

#footer {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
	width: 100%;
	background-color: #89c587;
	color: #fff;
}

.text span {
	display: block;
	padding: 20px 40px 5px 40px;
	font-size: 20px;
}

.text p {
	line-height: 30px;
	margin: 0 230px;
	font-size: 16px;
}

.text p:nth-child(3) {
	margin: 0 240px;
}

.text p:nth-child(4) {
	margin: 0 250px;
}

.text {
	flex: 7;
}

.message {
	flex: 3;
}

.message p {
	font-size: 24px;
	margin: 60px auto;
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
